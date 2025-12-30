import React from 'react'
import CountContext from './CountContext'
import { useState } from 'react'
import { useEffect } from 'react'

export const CountProvider = ({ children }) => {
    const [countUploads, setCountUploads] = useState(() => {
        return Number(localStorage.getItem("countUploads"))
    })

    const [countUser, setCountUser] = useState(() => {
        return Number(localStorage.getItem("countUser"))
    })

    useEffect(() => {
        return () => {
            localStorage.setItem("countUploads", countUploads);
        }
    }, [countUploads])

    useEffect(() => {
        return () => {
            localStorage.setItem("countUser", countUser);
        }
    }, [countUser])

    return (
        <CountContext.Provider value={{ countUploads, setCountUploads, countUser ,setCountUser }}>
            {children}
        </CountContext.Provider>

    )
}
