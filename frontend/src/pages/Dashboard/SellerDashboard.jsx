import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { API_URL } from "@/config/api"
import { useCount } from "@/context/CountContext"
import { ShoppingCart, Package } from "lucide-react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

export default function SellerDashboard() {
  const [openPop, setOpenPop] = useState(false);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [imgFile, setImgFile] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const { countUploads } = useCount()
  // const [count, setCount] = useState(countUploads);


  const handleadd = async (e) => {
    e.preventDefault();

    if (!title || !price || !pdfFile || !imgFile) {
      toast.error("Please fill all fields and select a PDF");
      return;
    }
    setLoading(true)

    const formdata = new FormData();
    formdata.append("title", title)
    formdata.append("price", price)
     formdata.append("image", imgFile)
     formdata.append("pdf", pdfFile)

    try {
      const res = await fetch(`${API_URL}/tasktype/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formdata,
      })

      const data = await res.json();
      console.log(data);

      if (res.ok) {
        toast.success("upload success");
        setOpenPop(false);
        setTitle("")
        setPrice("")
        setImgFile(null)
        setPdfFile(null)

      } else {
        toast.error("upload failed")
      }

    } catch (error) {
      console.log('not submitted')
      toast.error("error in submission")
    }
    finally {
      setLoading(false)
    }
  }

  // useEffect(() => {
  //   if (open) {
  //     setOpen(false);
  //   }
  // }, []);


  return (
    <div className="min-h-screen my-20 bg-background p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold"> Seller Dashboard</h1>
        <p className="text-muted-foreground">Welcome back to your store</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

        <Card onClick={() => { navigate('/seller/uploads') }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Uploads</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{countUploads}</div>
          </CardContent>
        </Card>

        <Card onClick={() => navigate('/seller/sales')}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium"></CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Sales</div>
          </CardContent>
        </Card>

      </div>

      <div className="flex mx-4 ">
        <Dialog open={openPop} onOpenChange={setOpenPop} >
          <DialogTrigger asChild>
            <Button onClick={() => setOpenPop(!openPop)}>Add PDF</Button>
          </DialogTrigger>
          <DialogContent className="max-w-md p-6 rounded-2xl shadow-lg bg-white ">
            <form onSubmit={handleadd} className="flex flex-col gap-4 mt-4">
              <Input type="text" placeholder="xyz" value={title} onChange={(e) => setTitle(e.target.value)} className="p-2 rounded-md " />
              <Input type="number" placeholder="$$" value={price} onChange={(e) => setPrice(e.target.value)} className="p-2 rounded-md " />
              <Input type="file" placeholder=".pdf" accept="application/pdf" onChange={(e) => setPdfFile(e.target.files[0])} className="p-2 rounded-md " />
              <Input type="file" placeholder=".jpg" accept="image/*" onChange={(e) => setImgFile(e.target.files[0])} className="p-2 rounded-md " />

              <div className="flex justify-between gap-2 mt-2">
                <Button type="button" onClick={() => setOpenPop(false)}>Cancel</Button>
                <Button type="submit" disabled={loading} >
                  {loading ? "Uploading.." : "Add"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

    </div>

  )
}
