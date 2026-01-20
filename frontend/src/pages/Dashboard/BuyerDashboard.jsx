import { useEffect, useState } from "react";
import BuyerCard from "../UserPages/BuyerCard";
import { useSearch } from "@/context/SearchContext";
import { useSidebar } from "@/context/SidebarContext";
import { API_URL } from "@/config/api";


export default function BuyerDashboard() {
  const { searchQuery } = useSearch();
  const [uploads, setUploads] = useState([]);
  const [purchases, setPurchases] = useState([]);


  const fetchUploads = async () => {
    try {
      const res = await fetch(`${API_URL}/tasktype/all`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      setUploads(data.tasks) || [];
    } catch (err) {
      console.error("Failed to fetch uploads", err);
    }
  };

  const fetchPurchases = async () => {
    try {
      const res = await fetch(`${API_URL}/salestype/orders`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const data = await res.json();
      setPurchases(data.sales || []);
    } catch (err) {
      console.error("Failed to fetch purchases", err);
    }
  };

  useEffect(() => {
    fetchUploads();
    fetchPurchases();
  }, []);

  // Filter search ra orders

const {tab } =useSidebar();

    const filterItems =  tab=== "orders" ?
    purchases.filter(
        (sale) =>
          sale.status === "approved" || sale.status === "pending"
      ):
    uploads.filter((upload) => 
   searchQuery
      ? upload.title.toLowerCase().includes(searchQuery.toLowerCase())
      : true
);
  

  const {openSheet2} =useSidebar()

  return (<>

<main
        className={`flex-1 p-6 transition-all duration-300 ${
          openSheet2 ? "md:ml-64" : ""
        }`}>
    <div className="min-h-screen my-20 bg-background p-6">

      <header className=" mb-8">
        <h1 className="text-3xl font-bold"> Buyer Dashboard</h1>
        <p className="text-muted-foreground">Want some books?</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
        
           {filterItems.length > 0 ? (
            filterItems.map((item) => {
              // For orders tab, item is a Sale object, need to get book info
              const book = tab === "orders" ? item.productId : item;
              return (
          <BuyerCard
            key={item._id}
            _id={item._id}
            title={book.title}
            price={book.price}
            pdfUrl={book.pdfUrl}
            previewUrl={book.previewUrl}
            upload={tab === "orders" ? item : book}
            productId={book._id}
            saleStatus={tab === "orders" ? item.status : undefined} 
          />
              );
})
)
      : ("No any orders or products")}
      </div>
    </div>
</main>
  </>
  );
}
