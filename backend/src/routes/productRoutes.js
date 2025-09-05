const express = require('express');
const router = express.Router();
const { Product } = require('../models');
const auth = require('../middleware/auth');

// Public - list products
router.get('/', async (req, res) => {
  const products = await Product.findAll();
  res.json(products);
});

// Public - single
router.get('/:id', async (req, res) => {
  const p = await Product.findByPk(req.params.id);
  if (!p) return res.status(404).json({ message: 'Not found' });
  res.json(p);
});

// Admin - create (protected)
router.post('/', auth, async (req, res) => {
  if (!req.user.isAdmin) return res.status(403).json({ message: 'Admins only' });
  const { title, description, price, image, stock } = req.body;
  const product = await Product.create({ title, description, price, image, stock });
  res.json(product);
});

// Admin - update
router.put('/:id', auth, async (req, res) => {
  if (!req.user.isAdmin) return res.status(403).json({ message: 'Admins only' });
  const p = await Product.findByPk(req.params.id);
  if (!p) return res.status(404).json({ message: 'Not found' });
  await p.update(req.body);
  res.json(p);
});

// Admin - delete
router.delete('/:id', auth, async (req, res) => {
  if (!req.user.isAdmin) return res.status(403).json({ message: 'Admins only' });
  const p = await Product.findByPk(req.params.id);
  if (!p) return res.status(404).json({ message: 'Not found' });
  await p.destroy();
  res.json({ message: 'Deleted' });
});

module.exports = router;
