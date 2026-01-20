
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { toast } from "sonner";
import { API_URL } from "@/config/api";

export default function SellerCard({ _id, title, price, pdfUrl, previewUrl, onDelete }) {

    const handledel = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`${API_URL}/tasktype/del/${_id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
            console.log(res)

            if (res.ok) {
                toast.success("deleted")
                onDelete(_id);
            } else {
                toast.error("not deleted")
            }
        } catch (err) {
            toast.error("error")
        }
    }

    // useEffect(() => {
    //     handledel()
    // }
    //     , [])

    return (
        <Card className="shadow-md hover:shadow-lg transition duration-200">
            <CardHeader>
                <CardTitle className="text-lg font-semibold">{title}</CardTitle>
            </CardHeader>

            <CardContent className="flex flex-col gap-3">
                {previewUrl && (
                    <img
                        src={previewUrl}
                        alt={title}
                        className="w-full h-48 object-cover rounded-md border"
                    />
                )}

                <p className="text-gray-600">Price: ${price}</p>

                <div className="flex justify-between">
                    <Button asChild variant="outline">
                        <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
                            View
                        </a>
                    </Button>
                    <Button onClick={handledel} variant="destructive">Delete</Button>
                </div>
            </CardContent>
        </Card>
    );
}
