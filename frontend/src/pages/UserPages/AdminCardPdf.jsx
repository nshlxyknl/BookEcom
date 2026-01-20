import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { API_URL } from '@/config/api';
import React, { useEffect } from 'react'
import { toast } from 'sonner';

export const AdminCardPdf = ({ _id, username, title, price, onDelete }) => {


  const handledel = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_URL}/tasktype/del/${_id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      const data = await res.json()
      if (res.ok) {
        toast.success("deleted")
        onDelete(_id);
        

      } else {
        toast.error("not deleted")
      }
    } catch (error) {
      res.status(500).json({
        message: "Could not add to cart",
        details: error.message,
      })
    }
  }

  // useEffect(()=>{
  //   handledel()
  // },[])

  return (

    <Card className="shadow-md hover:shadow-lg transition duration-200">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-3">
        <p className="text-gray-600">Price: ${price}</p>
        <p className="text-gray-600">Uploaded by: {username}</p>
        <div className="flex justify-between">
          <div className="flex items-center gap-2 mt-1">
            <Button variant="destructive" onClick={handledel}> Delete </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
