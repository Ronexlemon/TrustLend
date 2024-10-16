import React from "react";
import { useRouter } from "next/router";
import { Button } from "./ui/button";
export interface SideBarProp{
  open: boolean;
  setOpen: (op: boolean)=> void;
}

const SideBar = ({open,setOpen}:SideBarProp) => {
  const router = useRouter();
  const handleOpen =()=>{
    setOpen(!open);

  }

  // Function to handle navigation
  const handleNavigation = (path:string) => {
    router.push(path);
  };

  return (
    <div className="h-screen w-1/4 bg-transparent text-gray-500 hover:text-black shadow-md flex flex-col">
      <div className="text-center py-4">
        <h2 className="text-2xl font-bold">Menu</h2>
      </div>

      <nav className="flex flex-col items-start p-4">
        <button
          onClick={() => handleNavigation("/dashboard/market")}
          className={`w-full text-left px-4 py-2 my-2 rounded-md bg-blue-200 hover:bg-blue-500 transition-colors duration-200 ${
            router.pathname === "/dashboard/market" ? "bg-blue-700" : ""
          }`}
        >
          Home
        </button>

        <button
          onClick={() => handleNavigation("/dashboard/market/loans")}
          className={`w-full text-left px-4 py-2 my-2 rounded-md bg-blue-200 hover:bg-blue-500  transition-colors duration-200 ${
            router.pathname === "/loans" ? "bg-blue-700" : ""
          }`}
        >
          User Loans
        </button>
        <button
          onClick={() => handleNavigation("/dashboard/market/loans/request")}
          className={`w-full text-left px-4 py-2 my-2 rounded-md bg-blue-200 tex-black hover:bg-blue-500  transition-colors duration-200 ${
            router.pathname === "/repay" ? "bg-blue-700" : ""
          }`}
        >
          User Requests
        </button>

        <button
          onClick={() => handleNavigation("/dashboard/market/loans/request/liquidate")}
          className={`w-full text-left px-4 py-2 my-2 rounded-md bg-blue-200 hover:bg-blue-500  transition-colors duration-200 ${
            router.pathname === "/repay" ? "bg-blue-700" : ""
          }`}
        >
          Liquidate
        </button>
        <div  className="pt-10">
        <Button onClick={handleOpen} className="bg-blue-700">
          Loan Request
        </Button>
      </div>
      </nav>
      
    </div>
  );
};

export default SideBar;
