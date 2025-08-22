import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Tittle from './Tittle';
import ProductItem from './ProductItem';

const LastestCollection = () => {
    const {products } = useContext(ShopContext);
    const [lastestProducts, setLastestProducts] = useState([])
    useEffect(()=>{
        if (products && products.length > 0) {
            setLastestProducts(products.slice(0, 10))
        }
    },[products])
  return (
    <div className='my-10'>
        <div className='text-center py-8 text-3xl'>
            <Tittle text1={'Lastest'} text2={'Collection'} />
            <p className='w-2/3 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aperiam illo suscipit 
            </p>
        </div>
        {/* Lastest Collection Products */}
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'>
            {
                lastestProducts.map((item,index)=>(
                    <ProductItem 
                        key={item._id || index} 
                        id={item._id} 
                        title={item.title} 
                        images={item.images} 
                        price={item.price}
                        rating={item.rating}
                        bestseller={item.bestseller}
                    />
                ))
            }
        </div>
    </div>
  )
}

export default LastestCollection