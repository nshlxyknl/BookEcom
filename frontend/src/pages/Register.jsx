import React, { useState } from 'react'
import { Card, CardContent } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Button } from '../components/ui/button'
import { Link, useNavigate} from 'react-router-dom'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'sonner'
import { API_URL } from '@/config/api'

export const Register = () => {

    const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const handlereg= async (e) => {
  e.preventDefault();

try{
const res= await fetch(`${API_URL}/logtype/register`,{
  method: "POST",
  headers: { "Content-Type":"application/json"},
  body: JSON.stringify({ username, password , role }),
 })

 const data= await res.json();
 console.log(data);

 if(res.ok){
  toast.success("reg successful");
  navigate(`/login`);
 }else {
        toast.error(data.message || "Reg failed");
      }
    } catch (err) {
      console.error("Error registrating in:", err);
      toast.error("Something went wrong");
    }

  }


  return (<>
        <div className='flex justify-center items-center min-h-screen px-4'>
                   <Card className={'w-full max-w-md p-6'}>
                       <CardContent >
                           <h2 className='text-center text-2xl font-semibold mb-4'> Register </h2>
                           <form  onSubmit={handlereg} className="space-y-4">
                               <Input type='text' placeholder= 'username' value={username} onChange={(e) => setUsername(e.target.value)} className={'p-4'}/>
                               <Input type='password' placeholder= 'password' value={password} onChange={(e) => setPassword(e.target.value)} className={'p-4'}/>
                              <Select value={role} onValueChange={(value)=> setRole(value)} >
                                                         <SelectTrigger>
                                                           <SelectValue placeholder="Role" />
                                                         </SelectTrigger>
                                                    <SelectContent>
                                                     <SelectItem value="buyer">Buyer</SelectItem>
                                                     <SelectItem value="seller">Seller</SelectItem>
                                                     </SelectContent>
                                                       </Select>
                              <div className="flex justify-center">
                               <Button type='submit' className="w-full sm:w-auto"> Register </Button>
                               </div>
                  <h3 className='text-center'> Already have an account? {""}
                    <Link to ="/login" className="text-blue-600 hover:underline">
                    Login
                    </Link>
                  </h3>
                                </form>
       </CardContent>
                   </Card>
               </div>
               </>
          
  )
}
