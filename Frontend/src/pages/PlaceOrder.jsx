import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { api } from '../services/api'
import { useNavigate } from 'react-router-dom'

const PlaceOrder = () => {
  const { cart, refreshCart } = useContext(ShopContext)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(()=>{ refreshCart() },[])

  const onCheckout = async ()=>{
    try{
      setLoading(true)
      setError('')
      const { clientSecret, orderId } = await api.createPaymentIntent()
      // For demo: fake confirm immediately
      await api.confirmOrder(orderId)
      navigate('/orders')
    }catch(e){
      setError(e.message || 'Payment failed')
    }finally{
      setLoading(false)
    }
  }

  const subtotal = cart.reduce((s,c)=> s + (c.product?.price||0) * c.quantity, 0)
  const delivery = 10
  const total = subtotal + delivery

  return (
    <div className='my-8 max-w-xl'>
      <h1 className='text-2xl font-semibold mb-4'>Checkout</h1>
      {error && <p className='text-red-500 mb-3'>{error}</p>}
      <div className='border rounded p-4'>
        <div className='flex justify-between'><span>Subtotal</span><span>₹{subtotal.toFixed(2)}</span></div>
        <div className='flex justify-between'><span>Delivery</span><span>₹{delivery.toFixed(2)}</span></div>
        <div className='flex justify-between font-semibold mt-2'><span>Total</span><span>₹{total.toFixed(2)}</span></div>
      </div>
      <button disabled={loading} onClick={onCheckout} className='mt-4 bg-black text-white py-2 px-4 rounded'>
        {loading ? 'Processing...' : 'Pay Now'}
      </button>
    </div>
  )
}

export default PlaceOrder