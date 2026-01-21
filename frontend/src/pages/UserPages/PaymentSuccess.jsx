import React, { useEffect } from 'react'

export const PaymentSuccess = () => {
    useEffect(() => {
        setTimeout(() => navigate("/dashboard"), 500);
    }, [])
    return (
        <div>PaymentSuccess</div>
    )
}
