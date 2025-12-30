import React, { createContext, useContext } from 'react'

const CountContext = createContext();
export const useCount= ()=> useContext(CountContext)

export default CountContext;
