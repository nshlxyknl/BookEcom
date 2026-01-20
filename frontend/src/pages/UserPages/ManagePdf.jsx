import React, { useEffect, useState } from 'react'
import { AdminCardPdf } from './AdminCardPdf'
import { useCount } from '@/context/CountContext';
import { API_URL } from '@/config/api';

export const ManagePdf = () => {
  const [pdf, setPdf] = useState([])
  const { setCountUploads } = useCount();


  const handlepdf = async () => {
    const res = await fetch(`${API_URL}/tasktype/all`, {
      method: "GET",
      headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` },
    })
    const data = await res.json();
    setPdf(data.tasks)
    setCountUploads(data.tasks.length)
  }

  useEffect(() => {
    handlepdf()
  }, [])

  return (
    <div className="min-h-screen my-20 bg-background p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
        {pdf.length === 0 ? (
          <p className="text-gray-500">No PDFs found</p>
        ) : (
          pdf.map((pdfs) => (
            <AdminCardPdf
              key={pdfs._id}
              _id={pdfs._id}
              title={pdfs.title}
              price={pdfs.price}
              username={pdfs.seller?.username || "Unknown"}
              onDelete={async (id) => {setPdf(prev => prev.filter(u => u._id !== id))
                                   await  handlepdf()
              }}
            />

          ))
        )}
      </div>
    </div>
  )
}
