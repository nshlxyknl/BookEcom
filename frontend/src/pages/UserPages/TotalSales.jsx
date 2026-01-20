import React, { useEffect, useState } from 'react'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { API_URL } from '@/config/api'


export const TotalSales = () => {
  const [sales,setSales]=useState([])
  const [statu,setStatu]=useState("pending")


    const handlesales=async()=>{
      try {
        const res= await fetch(`${API_URL}/salestype/sales`,
        {method: "GET",
          headers:{
            Authorization:`Bearer ${localStorage.getItem("token")}`
          }
        }
      )

      const data= await res.json();
      console.log("hehe",data)

      if(res.ok){
        setSales(data.sales);
      }
      } catch (error) {
        toast.error("error in getting")
      }
  }

  useEffect(()=>{
    handlesales();
  },[])
  

const updateStatus = async (id, status) => {
  try {
    const res = await fetch(`${API_URL}/salestype/${id}/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ status }),
    });
    const updated = await res.json();

    setSales((prev) =>
      prev.map((s) => (s._id === id ? { ...s, status: updated.status } : s))
    );
  } catch (error) {
    toast.error("Error updating sale");
  }
};


  return (
    <div className=" mt-20 overflow-hidden rounded-md border ">
      <Table>
        <TableHeader>
           <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Book Title</TableHead>
            <TableHead>Status</TableHead>

          </TableRow>
        </TableHeader>

        <TableBody>
          
              {sales.length > 0 ? ( 
            sales.map((item, i) => (
              <TableRow key={item._id}>
                <TableCell>{new Date(item.date).toLocaleDateString()}</TableCell>
                <TableCell>{item.title}</TableCell>
                <TableCell>
          {item.status === "pending" ? (
            <>
              {/* <Button onClick={() => updateStatus(item._id, "approved")}>Approve</Button>
              <Button onClick={() => updateStatus(item._id, "rejected")}>Reject</Button> */}
             <Select value={statu} onValueChange={(value)=> {setStatu(value); 
                                                              updateStatus(item._id, value);}} >
                                                         <SelectTrigger className="w-[140px] h-9 text-sm">
                                                           <SelectValue placeholder="Pending" />
                                                         </SelectTrigger>
                                                    <SelectContent>
                                                     <SelectItem value="approved" >Approve</SelectItem>
                                                     <SelectItem value="rejected">Reject</SelectItem>
                                                     </SelectContent>
                                                       </Select>
            </>
          ) : (
            <span
              style={{
                color: item.status === "approved" ? "green" : "red",
              }}
            >
              {item.status}
            </span>
          )}
        </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} align="center">
                No sales data yet.
              </TableCell>
            </TableRow>
          )}
            
        </TableBody>
      </Table>
    </div>
)}



