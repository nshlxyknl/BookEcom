import { useAuth } from '@/context/AuthContext'
import React from 'react'
import { Navigate } from 'react-router-dom'

export const ProtectedRoutes = ({children}) => {
const { token } = useAuth()
    if(token)
        return children
    else
        return( <Navigate to="/login" /> )
}
