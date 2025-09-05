# 🛒 MERN + MySQL E-Commerce Website

A full-stack **E-Commerce web application** built using the **MERN stack** (MySQL instead of MongoDB).  
It includes authentication, product management, cart system, and an admin dashboard.

---

## 🚀 Features
- 🔐 User Authentication (Register/Login with JWT)
- 🛍️ Product listing with images & details
- 🛒 Shopping cart and checkout system
- 📦 Order management
- 👨‍💼 Admin dashboard for managing products & orders
- 🎨 Responsive frontend (React + TailwindCSS)

---

## 🛠️ Tech Stack
- **Frontend:** React, Axios, TailwindCSS  
- **Backend:** Node.js, Express.js  
- **Database:** MySQL (via Sequelize ORM)  
- **Auth:** JWT (JSON Web Tokens)  
- **Other:** Docker (optional)

---

## 📂 Project Structure

 ecommerce-mysql-final/
│── backend/ # Express backend + MySQL
│── frontend/ # React frontend
│── docker-compose.yml (optional)
│── README.md


Create a .env file inside backend/:

PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=ecommerce
JWT_SECRET=your_jwt_secret


Quick start (without Docker):
- Backend:
  cd backend
  cp .env.example .env   # edit DB credentials
  npm install
  node seed.js           # optional: creates admin and sample products
  npm run dev
  -> server runs on http://localhost:5000

- Frontend:
  cd frontend
  npm install
  npm start
  -> app runs on http://localhost:3000

With Docker:
  docker-compose up --build
  - Backend will be available at http://localhost:5000
  - MySQL on port 3306




🤝 Contributing

Contributions are welcome! Feel free to open issues or pull requests.