import React, { useState } from 'react'
import CartContext from './CartContext';
import { toast } from 'sonner';
import { API_URL } from '@/config/api';

export const CartProvider = ({ children }) => {

const [cartCount, setCartCount] = useState(0);
const [cartItems, setCartItems] = useState([]);

  const updateCart = (newCart) => {
    setCartItems(newCart.items);
    setCartCount(newCart.items.reduce((acc, item) => acc + item.quantity, 0));
  };

  const cartadd= async({ _id, title, price, quantity })=>{
      try {
        const res = await fetch(`${API_URL}/carttype/add`,
          {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ productId: _id, title, price, quantity })
          }
        )
  
        const hi = await res.json();
        updateCart(hi)
  
        if (res.ok) {
          toast.success("added in your cart")
          
          
        } else {
          toast.error("error")
        }
      } catch (error) {
        console.error("error")
      }
    }

     

    return (
        <CartContext.Provider value={{cartItems,cartCount,cartadd,updateCart}}>
            {children}
        </CartContext.Provider>
    )
}
