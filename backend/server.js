const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const { sequelize } = require('./src/models');
const userRoutes = require('./src/routes/userRoutes');
const productRoutes = require('./src/routes/productRoutes');
const orderRoutes = require('./src/routes/orderRoutes');

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

const PORT = process.env.PORT || 5000;
sequelize.authenticate()
.then(() => console.log('✅ DB connected'))
.catch(err => console.error('DB connection error:', err));

sequelize.sync({ alter: true }).then(() => {
  app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
});
