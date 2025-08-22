import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
  const { login, register } = useContext(AuthContext)
  const [isRegister, setIsRegister] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const onSubmit = async (e)=>{
    e.preventDefault()
    setError('')
    try{
      if(isRegister){
        await register(name, email, password)
      }else{
        await login(email, password)
      }
      navigate('/')
    }catch(err){
      setError(err.message || 'Failed')
    }
  }

  return (
    <div className='max-w-md mx-auto my-10'>
      <h2 className='text-2xl font-semibold mb-4'>{isRegister?'Create account':'Login'}</h2>
      {error && <p className='text-red-500 mb-3'>{error}</p>}
      <form onSubmit={onSubmit} className='flex flex-col gap-3'>
        {isRegister && <input value={name} onChange={e=>setName(e.target.value)} placeholder='Name' className='border p-2 rounded' required />}
        <input type='email' value={email} onChange={e=>setEmail(e.target.value)} placeholder='Email' className='border p-2 rounded' required />
        <input type='password' value={password} onChange={e=>setPassword(e.target.value)} placeholder='Password' className='border p-2 rounded' required />
        <button className='bg-black text-white py-2 rounded'>{isRegister?'Register':'Login'}</button>
      </form>
      <div className='mt-4 text-sm'>
        {isRegister?(
          <span>Already have an account? <button className='underline' onClick={()=>setIsRegister(false)}>Login</button></span>
        ):(
          <span>New here? <button className='underline' onClick={()=>setIsRegister(true)}>Create an account</button></span>
        )}
      </div>
    </div>
  )
}

export default Login