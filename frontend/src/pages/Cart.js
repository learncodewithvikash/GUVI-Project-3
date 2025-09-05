import React from 'react';
import axios from 'axios';

export default function Cart({ cart, setCart, token, setCartAfterCheckout }) {
  const remove = (id) => setCart(cart.filter(c=>c.productId!==id));
  const changeQty = (id, qty) => setCart(cart.map(c=> c.productId===id ? {...c, quantity: qty} : c));

  const checkout = async () => {
    if (!token) return alert('Login to checkout');
    try {
      const items = cart.map(c=> ({ productId: c.productId, quantity: c.quantity }));
      const res = await axios.post('http://localhost:5000/api/orders', { items }, { headers: { Authorization: 'Bearer '+token }});
      alert('Order placed. Total: ₹' + res.data.total);
      setCartAfterCheckout();
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  const total = cart.reduce((s,i)=> s + i.price * i.quantity, 0);

  return (
    <div>
      <h2>Your Cart</h2>
      {cart.length === 0 && <p>Cart empty</p>}
      <ul>
        {cart.map(i=> <li key={i.productId} style={{marginBottom:8}}>
          {i.title} — ₹{i.price} x 
          <input style={{width:50, marginLeft:8}} type="number" value={i.quantity} min="1" onChange={e=> changeQty(i.productId, Number(e.target.value))} />
          <button onClick={()=> remove(i.productId)} style={{marginLeft:8}}>Remove</button>
        </li>)}
      </ul>
      <p>Total: ₹{total.toFixed(2)}</p>
      <button onClick={checkout} disabled={cart.length===0}>Checkout</button>
    </div>
  );
}
