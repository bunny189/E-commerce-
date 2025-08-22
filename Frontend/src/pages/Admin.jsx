import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { api } from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Admin() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ title: '', price: '', category: '', description: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) return;
    if (user.role !== 'admin') navigate('/');
  }, [user, navigate]);

  const load = async () => {
    const res = await api.listProducts({ limit: 100 });
    setProducts(res.data);
  };
  useEffect(() => { load(); }, []);

  const onCreate = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...form, price: Number(form.price), images: [] };
      await api.adminCreateProduct(payload);
      setForm({ title: '', price: '', category: '', description: '' });
      await load();
    } catch (err) {
      setError(err.message);
    }
  };

  const onDelete = async (id) => {
    await api.adminDeleteProduct(id);
    await load();
  };

  return (
    <div className='my-8'>
      <h1 className='text-2xl font-semibold mb-4'>Admin</h1>
      {error && <p className='text-red-500 mb-3'>{error}</p>}
      <form onSubmit={onCreate} className='flex flex-col gap-2 max-w-xl'>
        <input placeholder='Title' value={form.title} onChange={(e)=>setForm({...form, title:e.target.value})} className='border p-2 rounded' required />
        <input placeholder='Price' type='number' value={form.price} onChange={(e)=>setForm({...form, price:e.target.value})} className='border p-2 rounded' required />
        <input placeholder='Category' value={form.category} onChange={(e)=>setForm({...form, category:e.target.value})} className='border p-2 rounded' />
        <textarea placeholder='Description' value={form.description} onChange={(e)=>setForm({...form, description:e.target.value})} className='border p-2 rounded' />
        <button className='bg-black text-white py-2 rounded w-40'>Create</button>
      </form>

      <h2 className='text-xl font-semibold mt-8 mb-2'>Products</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
        {products.map((p)=> (
          <div key={p._id} className='border p-3 rounded'>
            <div className='font-medium'>{p.title}</div>
            <div className='text-sm text-gray-600'>₹{p.price}</div>
            <div className='text-xs text-gray-500'>{p.category}</div>
            <button onClick={()=>onDelete(p._id)} className='mt-2 text-red-600 underline'>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}


