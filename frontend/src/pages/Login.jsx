import React, { useState } from 'react'
import { Card, CardContent } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Button } from '../components/ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { toast } from 'sonner'

export const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
  const { login } = useAuth();

const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:4000/logtype/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password  }),
      });

      const data = await res.json();
      console.log("Response from backend:", data);

      if (res.ok) {
        login(data.token, data.user.role);
        toast.success("Login successful!");
        navigate("/dashboard"); 
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (err) {
      console.error("Error logging in:", err);
      toast.error("Something went wrong");
    }
  };

    return (<>
    

        <div className='flex justify-center items-center min-h-screen px-4'>
            <Card className={'w-full max-w-md p-6'}>
                <CardContent >
                    <h2 className='text-center text-2xl font-semibold mb-4'> Login </h2>
                    <form  onSubmit={handleSubmit} className="space-y-4">
                        <Input type='text' placeholder='username' value={username} onChange={(e) => setUsername(e.target.value)} className={'p-4'} />
                        <Input type='password' placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} className={'p-4'} />
                        <div className="flex justify-center">
                            <Button type='submit' className="w-full sm:w-auto"> Login </Button>
                        </div>
                        <h3 className='text-center'> Don't have an account? {""}
                            <Link to="/register" className="text-blue-600 hover:underline">
                                Register
                            </Link>
                        </h3>
                    </form>
                </CardContent>
            </Card>
        </div>
        </>
    )
}
