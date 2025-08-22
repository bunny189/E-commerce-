import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom';
import Tittle from './Tittle';
import ProductItem from './ProductItem';

const BestSeller = () => {
    const {products} = useContext(ShopContext);
    const [bestseller, setBestSeller] = useState([]);

    useEffect(()=>{
        if (products && products.length > 0) {
            const bestSellerProducts = products.filter((item) => item.bestseller === true);
            setBestSeller(bestSellerProducts.slice(0, 5));
        }
    },[products])
  return (
    <div className='my-10'>
        <div className='text-center py-8 text-3xl'>
            <Tittle text1={'Best'} text2={'Seller'} />
            <p className='w-2/3 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aperiam illo suscipit
            </p>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'>
            {
                bestseller.map((item,index) =>(
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

export default BestSeller