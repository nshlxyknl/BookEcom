import { Home, Package, ShoppingCart } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { useSidebar } from "@/context/SidebarContext"

const menuItems = [
  { title: "Products", icon: Package, tab:"products" },
  { title: "Orders", icon: ShoppingCart, tab:"orders" },
]

export function SidebarLay({ onNavigate }) {
  const navigate = useNavigate()
  const {setTab}=useSidebar()

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900 border-r p-4">
      <h2 className="text-xl font-bold mb-6">My Bar</h2>

      <nav className="space-y-2">
        {menuItems.map(({ title, icon: Icon, path ,tab}) => (
          <Button
            key={title}
            variant="ghost"
            className="w-full justify-start"
            onClick={() => {
                setTab(tab)
              onNavigate?.() 
            }}
          >
            <Icon className="w-4 h-4 mr-2" />
            {title}
          </Button>
        ))}
      </nav>
    </div>
  )
}
