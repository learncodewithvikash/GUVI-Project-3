import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './styles.css';
import Login from './pages/Login';
import Admin from './pages/Admin';
import Cart from './pages/Cart';

function App(){
  const [products, setProducts] = useState([]);
  const [route, setRoute] = useState(window.location.hash.replace('#','') || 'home');
  const [user, setUser] = useState(()=> {
    try{ return JSON.parse(localStorage.getItem('user')) } catch { return null }
  });
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [cart, setCart] = useState(()=> {
    try{ return JSON.parse(localStorage.getItem('cart')) || [] } catch { return [] }
  });

  useEffect(()=> {
    axios.get('http://localhost:5000/api/products')
    .then(res => setProducts(res.data))
    .catch(err => console.error(err));
    window.addEventListener('hashchange', ()=> setRoute(window.location.hash.replace('#','') || 'home'));
  },[]);

  useEffect(()=> localStorage.setItem('cart', JSON.stringify(cart)), [cart]);
  useEffect(()=> { if(token) localStorage.setItem('token', token); else localStorage.removeItem('token'); }, [token]);
  useEffect(()=> { if(user) localStorage.setItem('user', JSON.stringify(user)); else localStorage.removeItem('user'); }, [user]);

  const addToCart = (p) => {
    const exists = cart.find(c => c.productId === p.id);
    if (exists) setCart(cart.map(c=> c.productId===p.id ? {...c, quantity: c.quantity+1}:c));
    else setCart([...cart, { productId: p.id, title: p.title, price: p.price, quantity:1 }]);
  };

  const logout = () => { setUser(null); setToken(null); window.location.hash='home' };

  return (
    <div className="container">
      <header>
        <h1 onClick={()=> window.location.hash='home'} style={{cursor:'pointer'}}>My Shop</h1>
        <nav>
          <a href="#home">Home</a>
          <a href="#cart">Cart ({cart.reduce((s,i)=>s+i.quantity,0)})</a>
          {user ? <>
            <span style={{marginLeft:12}}>Hi, {user.name}</span>
            {user.isAdmin && <a href="#admin" style={{marginLeft:12}}>Admin</a>}
            <button onClick={logout} style={{marginLeft:12}}>Logout</button>
          </> : <a href="#login">Login</a>}
        </nav>
      </header>

      <main>
        {route === 'home' && <div className="grid">
          {products.map(p => (
            <div className="card" key={p.id}>
              <img src={p.image || 'https://via.placeholder.com/300x200?text=Product'} alt={p.title}/>
              <h3>{p.title}</h3>
              <p className="price">₹{p.price}</p>
              <p>{p.description}</p>
              <div style={{display:'flex', gap:8, marginTop:8}}>
                <button onClick={()=>addToCart(p)}>Add to cart</button>
                <button onClick={()=> { window.location.hash = 'product-'+p.id }}>View</button>
              </div>
            </div>
          ))}
        </div>}

        {route.startsWith('product-') && (()=> {
          const id = route.split('-')[1];
          const p = products.find(x => String(x.id) === String(id));
          if(!p) return <div>Product not found</div>;
          return <div style={{display:'flex', gap:20}}>
            <img src={p.image || 'https://via.placeholder.com/500x350'} style={{width:420, height:300, objectFit:'cover'}}/>
            <div>
              <h2>{p.title}</h2>
              <p className="price">₹{p.price}</p>
              <p>{p.description}</p>
              <p>Stock: {p.stock}</p>
              <div style={{marginTop:12}}>
                <button onClick={()=>addToCart(p)}>Add to cart</button>
              </div>
            </div>
          </div>;
        })()}

        {route === 'login' && <Login onLogin={(token, user)=> { setToken(token); setUser(user); window.location.hash='home' }} />}

        {route === 'admin' && <Admin token={token} />}

        {route === 'cart' && <Cart cart={cart} setCart={setCart} token={token} setCartAfterCheckout={()=> setCart([])} />}

      </main>
      <footer>Starter e-commerce — My Shop</footer>
    </div>
  );
}
export default App;
