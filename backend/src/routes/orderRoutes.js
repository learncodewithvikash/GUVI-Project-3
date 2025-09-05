const express = require('express');
const router = express.Router();
const { Order, Product } = require('../models');
const auth = require('../middleware/auth');

// Create order (protected) - simple cart checkout mockup
router.post('/', auth, async (req, res) => {
  try {
    const { items } = req.body; // items = [{ productId, quantity }]
    if (!items || !Array.isArray(items) || items.length === 0) return res.status(400).json({ message: 'No items' });
    let total = 0;
    for (const it of items) {
      const p = await Product.findByPk(it.productId);
      if (!p) return res.status(400).json({ message: 'Product not found: ' + it.productId });
      if (p.stock < it.quantity) return res.status(400).json({ message: 'Out of stock: ' + p.title });
      total += p.price * it.quantity;
      // reduce stock
      await p.update({ stock: p.stock - it.quantity });
      // create order record per-item (simple)
      await Order.create({ UserId: req.user.id, ProductId: p.id, quantity: it.quantity, total: p.price * it.quantity });
    }
    res.json({ message: 'Order placed', total });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get user's orders
router.get('/my', auth, async (req, res) => {
  const orders = await Order.findAll({ where:{ UserId: req.user.id }, include: ['Product'] });
  res.json(orders);
});

module.exports = router;
