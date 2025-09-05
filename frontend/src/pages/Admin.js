import React, {useEffect, useState} from 'react';
import axios from 'axios';

export default function Admin({ token }){
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ title:'', description:'', price:0, stock:0, image:''});
  const [err, setErr] = useState('');

  useEffect(()=> {
    axios.get('http://localhost:5000/api/products').then(r=> setProducts(r.data)).catch(()=>{});
  },[]);

  const authHeaders = { headers: { Authorization: 'Bearer '+token }};

  const createProduct = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/products', form, authHeaders);
      setProducts([...products, res.data]);
      setForm({ title:'', description:'', price:0, stock:0, image:''});
    } catch (err) { setErr(err.response?.data?.message || err.message); }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete('http://localhost:5000/api/products/'+id, authHeaders);
      setProducts(products.filter(p=>p.id!==id));
    } catch (err) { setErr(err.response?.data?.message || err.message); }
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <section style={{display:'flex', gap:20}}>
        <div style={{flex:1}}>
          <h3>Create product</h3>
          <form onSubmit={createProduct}>
            <div><input placeholder="Title" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} required /></div>
            <div><textarea placeholder="Description" value={form.description} onChange={e=>setForm({...form,description:e.target.value})} /></div>
            <div><input type="number" placeholder="Price" value={form.price} onChange={e=>setForm({...form,price:Number(e.target.value)})} required /></div>
            <div><input type="number" placeholder="Stock" value={form.stock} onChange={e=>setForm({...form,stock:Number(e.target.value)})} required /></div>
            <div><input placeholder="Image URL" value={form.image} onChange={e=>setForm({...form,image:e.target.value)})} /></div>
            <button type="submit">Create</button>
            {err && <p style={{color:'red'}}>{err}</p>}
          </form>
        </div>
        <div style={{flex:1}}>
          <h3>Products</h3>
          <ul>
            {products.map(p=> <li key={p.id} style={{marginBottom:10}}>
              <strong>{p.title}</strong> — ₹{p.price} — stock: {p.stock}
              <button style={{marginLeft:8}} onClick={()=> deleteProduct(p.id)}>Delete</button>
            </li>)}
          </ul>
        </div>
      </section>
    </div>
  );
}
