import {BrowserRouter as Router, Routes ,Route, Navigate} from "react-router-dom"
import { HomePage } from "./pages/HomePage"
import { Register } from "./pages/Register"
import { Login } from "./pages/Login"
import Navbar from "./components/Layout/Navbar"
import { Footer } from "./components/Layout/Footer"
import Dashboard from "./pages/Dashboard/Dashboard"
import { ProtectedRoutes } from "./Routes/ProtectedRoutes"
import { PublicRoutes } from "./Routes/PublicRoutes"
import { SellerUploads } from "./pages/UserPages/SellerUploads"
import { ManagePdf } from "./pages/UserPages/ManagePdf"
import { ManageUsers } from "./pages/UserPages/ManageUsers"
import { TotalSales } from "./pages/UserPages/TotalSales"
import { Toaster } from "sonner"
import { PaymentSuccess } from "./pages/UserPages/PaymentSuccess"


function App() {
 return(<>
<Router>
    <Navbar/>
<Routes>
  <Route path='/' element={<Navigate to ='/home' replace/>} ></Route>
  <Route path='/home' element={<PublicRoutes> <HomePage/> </PublicRoutes>}> </Route>
  <Route path='/register' element={<PublicRoutes> <Register/> </PublicRoutes> } ></Route>
  <Route path='/login' element={<PublicRoutes> <Login/> </PublicRoutes> } ></Route>
  <Route path='/pay-success' element={<PublicRoutes> <PaymentSuccess/> </PublicRoutes> } ></Route>
  <Route path='/dashboard' element={<ProtectedRoutes> <Dashboard/> </ProtectedRoutes>}/> 
      <Route path='/seller/uploads' element={ <ProtectedRoutes>  <SellerUploads/> </ProtectedRoutes>}/> 
      <Route path='/seller/sales' element={ <ProtectedRoutes>  <TotalSales/> </ProtectedRoutes>}/> 
      <Route path='/admin/mpdf' element={ <ProtectedRoutes>  <ManagePdf/> </ProtectedRoutes>}/> 
      <Route path='/admin/musers' element={ <ProtectedRoutes>  <ManageUsers/> </ProtectedRoutes>}/> 
</Routes>
 <Footer/>
         <Toaster position="top-center" reverseOrder={false} />
</Router>
 </>)
}

export default App
