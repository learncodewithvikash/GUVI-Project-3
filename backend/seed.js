/**
 * Run this file with: node seed.js
 * It will create an admin user and sample products.
 */
const bcrypt = require('bcrypt');
const { sequelize, User, Product } = require('./src/models');

async function seed(){
  await sequelize.sync({ force: false });
  const password = await bcrypt.hash('admin123', 10);
  const [admin] = await User.findOrCreate({ where:{ email:'admin@example.com' }, defaults:{ name:'Admin', password, isAdmin:true }});
  const products = [
    { title:'Blue T-Shirt', description:'Comfortable cotton tee', price:19.99, image:'', stock:50 },
    { title:'Running Shoes', description:'Lightweight running shoes', price:79.99, image:'', stock:20 },
    { title:'Wireless Headphones', description:'Noise-cancelling', price:129.99, image:'', stock:15 }
  ];
  for(const p of products) await Product.findOrCreate({ where:{ title: p.title }, defaults: p });
  console.log('Seed done');
  process.exit(0);
}
seed();
