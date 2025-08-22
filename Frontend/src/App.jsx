import React from 'react'
import {Routes, Route } from 'react-router-dom'
import About from './pages/About'
import Cart from './pages/Cart'
import Collection from './pages/Collection'
import Contact from './pages/Contact'
import Home from './pages/Home'
import Login from './pages/Login'
import Orders from './pages/Orders'
import PlaceOrder from './pages/PlaceOrder'
import Product from './pages/Product'
import Navbar from './components/Navbar'
import AuthProvider from './context/AuthContext'
import Admin from './pages/Admin'

const App = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <AuthProvider>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About/>}/> 
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/Collection" element={<Collection/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/orders" element={<Orders/>}/>
        <Route path="/placeorder" element={<PlaceOrder/>}/>
        <Route path="/product/:productId" element={<Product/>}/>
        <Route path="/admin" element={<Admin/>} />
      </Routes>
      </AuthProvider>
    </div>
  )
}

export default App