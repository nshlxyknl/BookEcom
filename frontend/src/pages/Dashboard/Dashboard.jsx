import React, { useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";
import BuyerDashboard from "./BuyerDashboard";
import SellerDashboard from "./SellerDashboard";
import { HomePage } from "../HomePage";
import { toast } from "sonner";

const Dashboard = () => {
  const role = localStorage.getItem("role");
  const location = useLocation()
  const navigate = useNavigate()



  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const status = query.get("payment");

    
    if (status === "success") {
      toast.success("Payment successful");
       const purchasedItems = JSON.parse(sessionStorage.getItem("purchasedItems") || "[]");
console.log("Items sent to pending:", purchasedItems);

      if (purchasedItems.length > 0) {
      fetch("http://localhost:4000/salestype/pending", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ items:purchasedItems }),
      })
      .then(res => res.json())
      .then(data => {console.log("Sales saved:", data)
                  sessionStorage.removeItem("purchasedItems");
        navigate(`/dashboard`, { replace: true })
    })
      .catch(err => console.error("Error saving sales:", err));
      }
    
    } else if (status === "cancel") {
      toast.error("Payment canceled");
      navigate(`/dashboard`, { replace: true })
    }

  }, [location.search ,  navigate]);

  if (!role)
    return <Navigate to="/login" />;

  switch (role) {
    case "admin":
      return <AdminDashboard />;
    case "buyer":
      return <BuyerDashboard />;
    case "seller":
      return <SellerDashboard />;
    default:
      return <HomePage />;
  }
};

export default Dashboard;
