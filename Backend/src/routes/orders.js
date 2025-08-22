import express from 'express';
import Stripe from 'stripe';
import { requireAuth } from '../middleware/auth.js';
import { User } from '../models/User.js';
import { Order } from '../models/Order.js';

const router = express.Router();
let stripe = null;
if (process.env.STRIPE_SECRET_KEY && process.env.STRIPE_SECRET_KEY !== 'sk_test_123') {
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2025-04-30.basil' });
}

router.use(requireAuth);

router.post('/create-payment-intent', async (req, res) => {
  if (!stripe) {
    // For development without Stripe, create a mock order
    const user = await User.findById(req.user.id).populate('cart.product');
    const items = user.cart.map((c) => ({
      product: c.product._id,
      title: c.product.title,
      price: c.product.price,
      quantity: c.quantity,
      image: c.product.images?.[0] || '',
    }));
    const subtotal = items.reduce((sum, it) => sum + it.price * it.quantity, 0);
    const deliveryFee = Number(process.env.DELIVERY_FEE || 10);
    const total = subtotal + deliveryFee;
    
    const order = await Order.create({ user: user._id, items, subtotal, total, status: 'pending' });
    res.json({ clientSecret: 'mock_secret', orderId: order._id });
    return;
  }

  const user = await User.findById(req.user.id).populate('cart.product');
  const items = user.cart.map((c) => ({
    product: c.product._id,
    title: c.product.title,
    price: c.product.price,
    quantity: c.quantity,
    image: c.product.images?.[0] || '',
  }));
  const subtotal = items.reduce((sum, it) => sum + it.price * it.quantity, 0);
  const deliveryFee = Number(process.env.DELIVERY_FEE || 10);
  const total = Math.round((subtotal + deliveryFee) * 100);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: 'inr',
    automatic_payment_methods: { enabled: true },
    metadata: { userId: String(user._id) },
  });

  const order = await Order.create({ user: user._id, items, subtotal, total: (subtotal + deliveryFee), status: 'pending', paymentIntentId: paymentIntent.id });
  res.json({ clientSecret: paymentIntent.client_secret, orderId: order._id });
});

router.post('/confirm', async (req, res) => {
  const { orderId } = req.body;
  const order = await Order.findById(orderId);
  if (!order) return res.status(404).json({ message: 'Order not found' });
  
  if (!stripe) {
    // For development without Stripe, mark as paid
    order.status = 'paid';
    await order.save();
    const user = await User.findById(req.user.id);
    user.cart = [];
    await user.save();
    res.json({ order });
    return;
  }
  
  const pi = await stripe.paymentIntents.retrieve(order.paymentIntentId);
  if (pi.status === 'succeeded') {
    order.status = 'paid';
    await order.save();
    const user = await User.findById(req.user.id);
    user.cart = [];
    await user.save();
  }
  res.json({ order });
});

router.get('/', async (req, res) => {
  const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
  res.json({ data: orders });
});

export default router;


