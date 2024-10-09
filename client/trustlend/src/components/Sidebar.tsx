import React from "react";
import { useRouter } from "next/router";

const SideBar = () => {
  const router = useRouter();

  // Function to handle navigation
  const handleNavigation = (path:any) => {
    router.push(path);
  };

  return (
    <div className="h-screen w-1/4 bg-transparent text-gray-500 hover:text-black shadow-md flex flex-col">
      <div className="text-center py-4">
        <h2 className="text-2xl font-bold">Menu</h2>
      </div>

      <nav className="flex flex-col items-start p-4">
        <button
          onClick={() => handleNavigation("/")}
          className={`w-full text-left px-4 py-2 my-2 rounded-md hover:bg-blue-700 transition-colors duration-200 ${
            router.pathname === "/" ? "bg-blue-700" : ""
          }`}
        >
          Home
        </button>

        <button
          onClick={() => handleNavigation("/loans")}
          className={`w-full text-left px-4 py-2 my-2 rounded-md hover:bg-blue-700 transition-colors duration-200 ${
            router.pathname === "/loans" ? "bg-blue-700" : ""
          }`}
        >
          Loans
        </button>

        <button
          onClick={() => handleNavigation("/repay")}
          className={`w-full text-left px-4 py-2 my-2 rounded-md hover:bg-blue-700 transition-colors duration-200 ${
            router.pathname === "/repay" ? "bg-blue-700" : ""
          }`}
        >
          Repay
        </button>
      </nav>
    </div>
  );
};

export default SideBar;
