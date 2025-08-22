import express from 'express';
import { requireAuth } from '../middleware/auth.js';
import { User } from '../models/User.js';
import { Product } from '../models/Product.js';

const router = express.Router();

router.use(requireAuth);

router.get('/', async (req, res) => {
  const user = await User.findById(req.user.id).populate('cart.product');
  res.json({ cart: user.cart });
});

router.post('/add', async (req, res) => {
  const { productId, quantity = 1 } = req.body;
  const user = await User.findById(req.user.id);
  const product = await Product.findById(productId);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  const existing = user.cart.find((c) => c.product.toString() === productId);
  if (existing) {
    existing.quantity += Number(quantity);
  } else {
    user.cart.push({ product: productId, quantity: Number(quantity) });
  }
  await user.save();
  res.json({ cart: user.cart });
});

router.post('/update', async (req, res) => {
  const { productId, quantity } = req.body;
  const user = await User.findById(req.user.id);
  const item = user.cart.find((c) => c.product.toString() === productId);
  if (!item) return res.status(404).json({ message: 'Item not in cart' });
  if (quantity <= 0) {
    user.cart = user.cart.filter((c) => c.product.toString() !== productId);
  } else {
    item.quantity = Number(quantity);
  }
  await user.save();
  res.json({ cart: user.cart });
});

router.post('/clear', async (req, res) => {
  const user = await User.findById(req.user.id);
  user.cart = [];
  await user.save();
  res.json({ cart: user.cart });
});

export default router;


