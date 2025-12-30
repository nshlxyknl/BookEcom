import { useAuth } from '@/context/AuthContext';
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../ui/button';
import { Menu, Search, SearchIcon, ShoppingCartIcon } from 'lucide-react';
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTrigger } from '../ui/sheet';
import { useEffect, useState } from 'react';
import { SheetCard } from '@/pages/UserPages/SheetCard';
import { Input } from '../ui/input';
import { useSearch } from '@/context/SearchContext';
import { SidebarLay } from '@/pages/UserPages/SidebarLay';
import { useSidebar } from '@/context/SidebarContext';
import { toast } from 'sonner';




export default function Navbar() {
  const { token, logout, role } = useAuth();
  const navigate = useNavigate()


  const handlelogout = () => {
    logout();
    navigate("/login", { replace: true })
  }


  const [openSheet, setOpenSheet] = useState(false)
  const { openSheet2, setOpenSheet2 } = useSidebar();

  const [cart, setCart] = useState([])


  const fetchUploads = async () => {
    try {
      const res = await fetch("http://localhost:4000/carttype/get", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      setCart(data);
      console.log("cart data", data)
      return data;
    } catch (err) {
      console.error("Failed to fetch uploads", err);
    }
  };

  useEffect(() => {
    fetchUploads();
  }, []);

  // yo thik xa 
  const clearcart = async () => {
    toast.success("clear cart")
    try {
      const res = await fetch("http://localhost:4000/carttype/clearcart", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        setCart([])
        console.log("cart clear data", data)
      } else {
        toast.error("not ok res")
      }
    } catch (err) {
      console.error("clear bhayena la", err);
    }
  }

  //yo thik xa 
  const handlepay = async () => {
    try {
      if (!cart || !cart.length) {
        toast.error("Your cart is empty");
        return;
      }
        sessionStorage.setItem("purchasedItems", JSON.stringify(cart));

      const res = await fetch("http://localhost:4000/carttype/pay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ items: cart }),
      });

      const data = await res.json();
      window.location.href = data.url;


    } catch (error) {
      console.error("Stripe error:", error.message);
    }
  }

  const { searchQuery, setSearchQuery } = useSearch();

  return (
    <div>

      <header className="fixed top-0 left-0  z-50  w-full shadow-md bg-white dark:bg-gray-900">
        <div className=" max-w-7xl mx-auto flex justify-between items-center px-4 py-4">

          {!token ? (
            <Link to="/dashboard" className=" text-xl font-bold text-blue-600">
              Readme
            </Link>
          )
            : (
              <nav className="hidden md:flex space-x-6">
                {
                  (role == 'buyer') ? (<>

                    <Button variant="outline" className="flex px-20" onClick={() => { setOpenSheet2(!openSheet2) }}>  <Menu className="size-5" /> </Button>

                    <aside className={`fixed top-20 left-0 w-64 h-[calc(100vh-5rem)] border-r bg-white dark:bg-gray-900 shadow-md
        transform transition-transform duration-300 ${openSheet2 ? "translate-x-0" : "-translate-x-full"}`}>
                      <SidebarLay />
                    </aside>

                    <Link to="/dashboard" className=" ml-15 text-xl font-bold text-blue-600">
                      Readme
                    </Link>
                    <div className='flex items-center space-x-2 w-full'>
                      <div className="relative w-[500px]  ml-35 ">
                        <Search className="absolute right-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="search"
                          placeholder="Search product ..."
                          className="pl-8"
                          value={searchQuery}
                          onChange={(e) => {
                            setSearchQuery(e.target.value);
                            fetchBooks(e.target.value);
                          }
                          }

                        />
                      </div>
                      <Sheet open={openSheet} onOpenChange={(open) => {
                        setOpenSheet(open)
                        if (open) {
                          fetchUploads();
                        }
                      }}>
                        <SheetTrigger asChild>
                          <Button variant="outline" className="flex ml-70" > My Cart <ShoppingCartIcon className="w-4 h-4" /> </Button>
                        </SheetTrigger>
                        <SheetContent>
                          <div>
                            <h2 className="font-bold text-lg mb-2">Your Cart</h2>
                            {cart?.length > 0 ?
                              (cart
                                .filter(item => item && item.title && item.quantity > 0)
                                .map((cart) => (
                                  <>
                                    <SheetCard
                                      key={cart.productId}
                                      productId={cart.productId}
                                      title={cart.title}
                                      price={cart.price}
                                      quantity={cart.quantity}
                                      refreshCart={fetchUploads}
                                    />
                                  </>
                                ))) :
                              <div> empty </div>
                            }
                          </div>
                          <SheetFooter>
                            <div className="flex justify-between gap-2 mt-2">
                              <Button variant="destructive" onClick={clearcart} > Clear Cart</Button>
                              <Button variant="default" onClick={handlepay}> Checkout</Button>
                              <Button variant="outline" onClick={() => { setOpenSheet(false) }}>Continue Shopping</Button>
                            </div>
                          </SheetFooter>
                        </SheetContent>
                      </Sheet>
                      <Button variant="destructive"  onClick={handlelogout} > Logout
                </Button>
                    </div>
                  </>
                  )
                    : (<>
                      <Link to="/dashboard" className="text-xl font-bold text-blue-600">
                        Readme
                      </Link>
                       <Button variant="destructive" className="ml-280" onClick={handlelogout} > Logout
                </Button>
                </>
                    )
                }
               

              </nav>
            )}
        </div>
      </header>
    </div>
  )
}
