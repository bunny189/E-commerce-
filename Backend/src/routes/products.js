import express from 'express';
import { Product } from '../models/Product.js';
import { requireAuth, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// Public list with search and filters
router.get('/', async (req, res) => {
  const { q, category, minPrice, maxPrice, page = 1, limit = 20 } = req.query;
  const filter = {};
  if (category) filter.category = category;
  if (minPrice || maxPrice) filter.price = {
    ...(minPrice ? { $gte: Number(minPrice) } : {}),
    ...(maxPrice ? { $lte: Number(maxPrice) } : {}),
  };
  let query = Product.find(filter);
  if (q) {
    query = query.find({ $text: { $search: q } });
  }
  const docs = await query
    .sort({ createdAt: -1 })
    .skip((Number(page) - 1) * Number(limit))
    .limit(Number(limit));
  const count = await Product.countDocuments(q ? { ...filter, $text: { $search: q } } : filter);
  res.json({ data: docs, page: Number(page), limit: Number(limit), total: count });
});

router.get('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: 'Not found' });
  res.json(product);
});

// Admin CRUD
router.post('/', requireAuth, requireAdmin, async (req, res) => {
  const created = await Product.create(req.body);
  res.status(201).json(created);
});

router.put('/:id', requireAuth, requireAdmin, async (req, res) => {
  const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

router.delete('/:id', requireAuth, requireAdmin, async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

export default router;


