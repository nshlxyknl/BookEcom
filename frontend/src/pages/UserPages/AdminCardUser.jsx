import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import React, { useEffect } from 'react'
import { toast } from 'sonner'

export const AdminCardUser = ({ _id, username, role, onDelete }) => {
    const handledeluser = async ( ) => {

        try {
            const res = await fetch(`http://localhost:4000/tasktype/deluser/${_id}`, {
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
            console.error("Error fetching users:", error);
        }
    }

    // useEffect(() => {
    //     handledeluser()
    // }, [])

    return (
        <Card className="shadow-md hover:shadow-lg transition duration-200">
            <CardHeader>
                <CardTitle className="text-lg font-semibold">{username}</CardTitle>
            </CardHeader>

            <CardContent className="flex flex-col gap-3">
                <p className="text-gray-600">Role: {role}</p>
                <div className="flex justify-between">
                    <div className="flex items-center gap-2 mt-1">
                        <Button variant="destructive" onClick={handledeluser}> Delete </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
