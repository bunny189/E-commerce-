import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'

const Cart = () => {
  const { cart, refreshCart, updateCart } = useContext(ShopContext)
  useEffect(()=>{ refreshCart() },[])
  const subtotal = cart.reduce((s,c)=> s + (c.product?.price||0) * c.quantity, 0)
  return (
    <div className='my-8'>
      <h1 className='text-2xl font-semibold mb-4'>Your Cart</h1>
      {cart.length===0 ? (
        <p>Your cart is empty. <Link to='/' className='underline'>Shop now</Link></p>
      ) : (
        <div className='grid gap-4'>
          {cart.map((c)=> (
            <div key={String(c.product)} className='flex items-center justify-between border p-3 rounded'>
              <div className='flex items-center gap-3'>
                {c.product?.images?.[0] && <img src={c.product.images[0]} className='w-16 h-16 object-cover rounded' alt='' />}
                <div>
                  <div className='font-medium'>{c.product?.title || 'Product'}</div>
                  <div className='text-sm text-gray-600'>₹{c.product?.price}</div>
                </div>
              </div>
              <div className='flex items-center gap-2'>
                <input type='number' min='0' value={c.quantity} onChange={(e)=> updateCart(c.product?._id || c.product, Number(e.target.value))} className='border w-16 p-1 rounded' />
              </div>
            </div>
          ))}
        </div>
      )}
      <div className='mt-6'>
        <div className='text-lg'>Subtotal: ₹{subtotal.toFixed(2)}</div>
        <Link to='/placeorder' className='inline-block mt-3 bg-black text-white py-2 px-4 rounded'>Checkout</Link>
      </div>
    </div>
  )
}

export default Cart