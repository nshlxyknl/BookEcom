import React, { useEffect, useState } from 'react'
import { useCount } from '@/context/CountContext';
import SellerCard from './SellerCard';
import { API_URL } from '@/config/api';

export const SellerUploads = () => {

     const [uploads, setUploads] = useState([]);
     const {setCountUploads} = useCount();
    
      
        const fetchUploads = async () => {
          try {
            const res = await fetch(`${API_URL}/tasktype/user`,{
              method:"GET",
               headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
          });
            const data = await res.json();
            setUploads(data.tasks);
            setCountUploads(data.tasks.length)
          } catch (err) {
            console.error("Failed to fetch uploads", err);
          }
        };
    
        useEffect(()=>{
          fetchUploads()
        },[])
        


  return (
     <div className="min-h-screen my-20 bg-background p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold"> Seller Uploads</h1>
      </header>

   <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
         {uploads.map((upload) => (
           <SellerCard
             key={upload._id}
             _id={upload._id}
             title={upload.title}
             price={upload.price}
             pdfUrl={upload.pdfUrl}
             previewUrl={upload.previewUrl}
             onDelete={async(id) => {setUploads(prev => prev.filter(u => u._id !== id))
              await fetchUploads()}
             }
           />
         ))}
       </div>
       </div>
  
  )
}

