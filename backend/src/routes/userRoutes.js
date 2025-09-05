const express = require('express');
const router = express.Router();
const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

// Register
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const exists = await User.findOne({ where:{ email }});
    if (exists) return res.status(400).json({ message:'Email exists' });
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password:hash });
    res.json({ id: user.id, name: user.name, email: user.email });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where:{ email }});
    if (!user) return res.status(400).json({ message: 'Invalid creds' });
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ message: 'Invalid creds' });
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
    res.json({ token, user: { id:user.id, name:user.name, email:user.email, isAdmin:user.isAdmin }});
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
