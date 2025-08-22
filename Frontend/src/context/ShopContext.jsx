import { createContext, useEffect, useState } from "react";
import { api } from "../services/api";

export const ShopContext = createContext();

const ShopContextProvider = (props)=>{
    const currency = "₹";
    const delivery_fee=10;
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(()=>{
        api.listProducts({ limit: 100 }).then((res)=> {
            console.log('Products loaded:', res.data);
            setProducts(res.data || []);
        }).catch((err) => {
            console.error('Error loading products:', err);
            setProducts([]);
        });
    },[]);

    const refreshCart = async ()=>{
        try{
            const res = await api.getCart();
            setCart(res.cart || []);
        }catch(_e){/* ignore when not logged in */}
    };

    const addToCart = async (productId, quantity=1)=>{
        await api.addToCart(productId, quantity);
        await refreshCart();
    };

    const updateCart = async (productId, quantity)=>{
        await api.updateCart(productId, quantity);
        await refreshCart();
    };

    const value = {
        products,
        currency,
        delivery_fee,
        cart,
        refreshCart,
        addToCart,
        updateCart
    }
    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );
}

export default ShopContextProvider;