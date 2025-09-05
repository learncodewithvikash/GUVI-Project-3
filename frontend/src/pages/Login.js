import React, {useState} from 'react';
import axios from 'axios';

export default function Login({ onLogin }){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/users/login', { email, password });
      const { token, user } = res.data;
      onLogin(token, user);
    } catch (err) {
      setErr(err.response?.data?.message || err.message);
    }
  };
  return (
    <div style={{maxWidth:420}}>
      <h2>Login</h2>
      <form onSubmit={submit}>
        <div><label>Email</label><input value={email} onChange={e=>setEmail(e.target.value)} required /></div>
        <div><label>Password</label><input type="password" value={password} onChange={e=>setPassword(e.target.value)} required /></div>
        <button type="submit">Login</button>
        {err && <p style={{color:'red'}}>{err}</p>}
      </form>
      <p>Use admin@example.com / admin123 for admin (after running seed.js)</p>
    </div>
  );
}
