
import { Button } from '@/components/ui/button'
import { API_URL } from '@/config/api'
import { useCart } from '@/context/CartContext'
import React, { useState } from 'react'
import { toast } from 'sonner'

export const SheetCard = ({ productId, title, price, quantity,  refreshCart  }) => {

  const { updateCart } = useCart()
  const [q, setq] = useState(quantity)


  //yo ni thik xa useeefeect 
  const pluscart = async () => {
    try {
      const res = await fetch(`${API_URL}/carttype/plus`,
        {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ productId: productId._id })
        }
      )

      const data = await res.json();
      updateCart(data)

      if (res.ok) {
        toast.success("added in your cart")
                await refreshCart()

      } else {
        toast.error("error")
      }

    } catch (error) {
      console.log(error)

    }
  }

  //yo thik xa
  const delcart = async () => {
    try {
      const res = await fetch(`${API_URL}/carttype/delete/${productId._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })

      const data = await res.json();
      if (res.ok) {
        console.log("deleted data", data)
        toast.success("deleted successfully")
        await refreshCart()
      } else {
        toast.error("not ok res")
      }
    }
    catch (error) {
      res.status(500).json({
        message: "Could not add to cart",
        details: error.message,
      })
    }
  }





  // yo ni thik xa  tara useeefct 
  const clearproduct = async () => {
    try {
      const res = await fetch(`${API_URL}/carttype/clean/${productId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })

      const data = await res.json();

      if (res.ok) {
        console.log("del", data)
        toast.error("deleted successfully")
        await refreshCart()
      } else {
        toast.error("not ok res")
      }
    }
    catch (error) {
      toast.error("error")
    }
  }






  return (

    <div className="p-4 w-80 bg-white shadow-lg">
      <div
        className="flex justify-between items-center border-b py-2">
        <div>
          <h3 className="font-semibold">{title}</h3>
          <p className="text-sm text-gray-600">
            ${price} × {q}
          </p>
        </div>
        <p className="font-bold">${price * quantity}</p>
      </div>
      <div className="flex items-center gap-2 mt-1">
        <Button disabled={q === 1} variant="outline" size="sm"
          onClick={async () => {
            if (q >= 1) {
              setq(q - 1);
              await delcart()
            }
          }} >-</Button>

        <span>{q}</span>

        <Button variant="outline" size="sm"
          onClick={async () => {
            setq(q + 1)
            await pluscart()
          }} >+</Button>
      </div>

      <Button onClick={() => { clearproduct() }}>Delete</Button>
    </div>
  )
}


