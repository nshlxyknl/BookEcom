
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useEffect, useState } from "react";
import { ShoppingCartIcon } from "lucide-react";
import { Rating } from "@mui/material";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Reviews } from "./Reviews";
import { toast } from "sonner";
import { API_URL } from "@/config/api";



export default function BuyerCard({ _id, title, price,productId, quantity, pdfUrl, previewUrl, upload, saleStatus }) {

  const { cartadd } = useCart()
  const [r, setr] = useState(1)

  const addcart = () => {
    cartadd({ _id, title, price, quantity: r });
  }

  const buypay = async () => {

    try {
      const cart = [{ title, price, quantity: r, productId }]
      sessionStorage.setItem("purchasedItems", JSON.stringify(cart));

      

      const res = await fetch(`${API_URL}/carttype/pay`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          items: cart,
          // buyerId: localStorage.getItem("userId"),
          // productId
        })
      });

      const data = await res.json();
      console.log("my product", data)
      console.log("Stripe URL:", data.url);

if (!data.url) {
  console.error("No URL returned from backend", data);
  return;
}
      window.location.href = data.url;



    } catch (error) {
      console.error("error in payment")
    }
  }

  const [star, setStar] = useState(0)
  const [comments, setComments] = useState("")
  const [loading, setLoading] = useState(false)
  const [openPop, setOpenPop] = useState(false)

  const handlereview = async (e) => {
    e.preventDefault();

    if (!comments || !star) {
      toast.error("Please fill the rating and comments")
      return;
    }
    console.log("Sending review for product:", _id);

    setLoading(true)

    try {
      const res = await fetch(`${API_URL}/retype/add/${_id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          comments,
          star
        }),
      })

      const data = await res.json();
      console.log(data)

      if (res.ok) {
        toast.success("upload success")
        setOpenPop(false)
        setComments("")
        setStar(0)
      } else if (res.status === 400) {
        toast.error("You have already reviewed this product!");
        setOpenPop(false)
        setComments("")
        setStar(0)
      }

    } catch (error) {
      console.log('not submitted')
      toast.error("error in submission")
    } finally {
      setLoading(false)
    }
  }

  const [reviews, setReview] = useState([])
  const [avgRating, setAvgRating] = useState(0);


  const handleget = async () => {
    try {
      const res = await fetch(`${API_URL}/retype/see/${_id}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      })

      const data = await res.json()
      console.log("reviews", data)
      setReview(data.reviews)
      setAvgRating(data.avgRating)
    } catch (error) {
      console.log(error)
    }
  }



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

          {saleStatus === "approved" ? (
            <Button>
              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                View PDF
              </a>
            </Button>
          ) :
          saleStatus === "pending" ? (
            <Button disabled variant="outline">
              Pending
            </Button>
          ): (<>
           <Button variant="default" onClick={buypay}>Buy</Button>
          <Button variant="outline" onClick={addcart}> <ShoppingCartIcon /></Button>
</>
          )}


            {saleStatus !== "approved" && (
          <div className="flex items-center gap-2 mt-1">
            <Button disabled={r === 1} variant="outline" size="sm"
              onClick={() => {
                if (r >= 1) {
                  setr(r - 1);
                }
                else {
                  setr(0)
                }
              }}
            >-</Button>
            <span>{r}</span>
            <Button variant="outline" size="sm"
              onClick={() => {
                setr(r + 1);
              }}
            >+</Button>
          </div>
          )}
         
          <div className="flex mx-4 ">
            <Dialog open={openPop} onOpenChange={setOpenPop} >
              <DialogTrigger asChild>
                <Button onClick={async () => {
                  setOpenPop(!openPop);
                  await handleget();
                }
                }>Rate me</Button>
              </DialogTrigger>
              <DialogContent className="max-w-md p-6 rounded-2xl shadow-lg bg-white ">
                <form onSubmit={handlereview} className="flex flex-col gap-4 mt-4">
                  <Input type="text" placeholder="comments" value={comments} onChange={(e) => setComments(e.target.value)} className="p-2 rounded-md " />
                  <Rating name="simple-controlled" value={star} onChange={(event, newValue) => setStar(newValue)} />

                  <div className="flex justify-between gap-2 mt-2">
                    <Button type="button" onClick={() => setOpenPop(false)}>Cancel</Button>
                    <Button type="submit" disabled={loading} >
                      {loading ? "Uploading.." : "Add"}
                    </Button>
                  </div>
                </form>

                <Reviews
                  avgRating={avgRating}
                  reviews={reviews}
                />

              </DialogContent>
            </Dialog>
          </div>

        </div>
      </CardContent>
    </Card>
  );
}
