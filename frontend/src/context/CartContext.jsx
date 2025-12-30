import React, { useContext } from 'react'
import { createContext } from 'react'

const CartContext = createContext(null);

export const useCart = () => useContext(CartContext)

export default CartContext
