import React from "react";
import SideBar from "../Sidebar";
import { LatestLoans } from "../LatestLoans";

const Dash = ()=>{
    return(
        <div className="w-full h-screen gap-4 flex bg-transparent">
            <SideBar />
            <div className=" flex flex-col w-5/6 h-full p-4">
                <div className="h-1/2">
                <span className="text-2xl font-semibold">Good to see you, Make your decision count</span>
                <LatestLoans />
                </div>
               
                <div className="h-1/2">
                <LatestLoans />
                </div>
            </div>


        </div>
    )
}
export default Dash