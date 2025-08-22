import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import ProductItem from '../components/ProductItem'

const Collection = () => {
  const { products } = useContext(ShopContext)
  const [q, setQ] = useState('')
  const [category, setCategory] = useState('')
  const [filtered, setFiltered] = useState([])
  
  useEffect(()=>{
    let filteredProducts = products;
    
    // Filter by search query
    if (q) {
      filteredProducts = filteredProducts.filter(p => 
        p.title?.toLowerCase().includes(q.toLowerCase()) ||
        p.description?.toLowerCase().includes(q.toLowerCase())
      );
    }
    
    // Filter by category
    if (category) {
      filteredProducts = filteredProducts.filter(p => p.category === category);
    }
    
    setFiltered(filteredProducts);
  }, [q, category, products])
  
  // Get unique categories
  const categories = [...new Set(products.map(p => p.category))].filter(Boolean);
  
  return (
    <div className='my-8'>
      <div className='text-center mb-8'>
        <h1 className='text-3xl font-bold mb-4'>Our Collection</h1>
        <p className='text-gray-600 max-w-2xl mx-auto'>
          Discover our latest products with amazing quality and competitive prices
        </p>
      </div>
      
      {/* Search and Filters */}
      <div className='mb-8 space-y-4'>
        <div className='flex flex-col sm:flex-row gap-4 max-w-4xl mx-auto'>
          <input 
            value={q} 
            onChange={e=>setQ(e.target.value)} 
            placeholder='Search products...' 
            className='flex-1 border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent' 
          />
          <select 
            value={category} 
            onChange={e=>setCategory(e.target.value)}
            className='border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent'
          >
            <option value="">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>
      
      {/* Products Grid */}
      {filtered.length === 0 ? (
        <div className='text-center py-12'>
          <p className='text-gray-500 text-lg'>No products found. Try adjusting your search.</p>
        </div>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'>
          {filtered.map(p => (
            <ProductItem 
              key={p._id} 
              id={p._id} 
              title={p.title} 
              images={p.images} 
              price={p.price}
              rating={p.rating}
              bestseller={p.bestseller}
            />
          ))}
        </div>
      )}
      
      {/* Results count */}
      <div className='text-center mt-8 text-gray-600'>
        Showing {filtered.length} of {products.length} products
      </div>
    </div>
  )
}

export default Collection