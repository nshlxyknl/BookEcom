import { createContext, useContext, useState } from "react";

const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  const [openSheet2, setOpenSheet2] = useState(false);
    const [tab, setTab] = useState("all"); 


  return (
    <SidebarContext.Provider value={{ openSheet2, setOpenSheet2, tab , setTab }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => useContext(SidebarContext);
