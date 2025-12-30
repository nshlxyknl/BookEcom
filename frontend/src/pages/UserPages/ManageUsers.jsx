import React, { useEffect, useState } from 'react'
import { AdminCardUser } from './AdminCardUser'
import { useCount } from '@/context/CountContext';

export const ManageUsers = () => {
  const [user, setUser] = useState([])
    const { setCountUser } = useCount();


  const handleusers = async () => {
    const res = await fetch("http://localhost:4000/tasktype/users", {
      method: "GET",
      headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` },
    })
    const data = await res.json();
    console.log("Drama",data)
    setUser(data)
    setCountUser(data.length)

  }

  useEffect(() => {
    handleusers()
  }, [])


  return (

    <div className="min-h-screen my-20 bg-background p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
        {user.length === 0 ? (
          <p className="text-gray-500">No Users found</p>
        ) : (
          user.map((users) => (
            <AdminCardUser
              key={users._id}
              _id={users._id}
              username={users.username || "Unknown"}
              role={users.role}
              onDelete={async (id) => {
                setUser(prev => prev.filter(u => u._id !== id))
                await handleusers()
              }}
            />

          ))
        )}
      </div>
    </div>

  )
}

