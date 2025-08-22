import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
const ProductItem = ({id, title, images, price, rating, bestseller}) => {

    const {currency, addToCart} = useContext(ShopContext);
    
    // Use a default image if none provided
    const imageUrl = images && images.length > 0 ? `/src/assets/${images[0]}` : '/src/assets/p_img1.png';
    
  return (
    <div className='text-gray-700 cursor-pointer group'>
        <div className='overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-all duration-300'>
            <img 
                className='w-full h-48 object-cover hover:scale-110 transition ease-in-out duration-300' 
                src={imageUrl} 
                alt={title} 
            />
            {bestseller && (
                <div className='absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full'>
                    Best Seller
                </div>
            )}
            <div className='p-4'>
                <h3 className='font-medium text-sm mb-2 line-clamp-2'>{title}</h3>
                <div className='flex items-center justify-between'>
                    <p className='text-sm font-bold'>{currency}{price}</p>
                    {rating && (
                        <div className='flex items-center text-yellow-500'>
                            <span className='text-xs'>★</span>
                            <span className='text-xs ml-1'>{rating}</span>
                        </div>
                    )}
                </div>
                <button 
                    onClick={(e) => {
                        e.preventDefault();
                        addToCart(id, 1);
                    }}
                    className='w-full mt-3 bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors text-sm'
                >
                    Add to Cart
                </button>
            </div>
        </div>
    </div>
  )
}

export default ProductItem