import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useCount } from "@/context/CountContext";
import { ShoppingCart, Users, DollarSign, Package } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function AdminDashboard() {

const navigate= useNavigate();
  const {countUploads,countUser}=useCount()

  

  return (
    <div className="min-h-screen my-20 bg-background p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">Welcome, Admin!</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

        <Card onClick={()=>{navigate('/admin/mpdf')}}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Manage PDF</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{countUploads}</div>
          </CardContent>
        </Card>

        <Card onClick={()=>{navigate('/admin/musers')}}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Manage Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{countUser}</div>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-4">
      </div>
    </div>
  )
}
