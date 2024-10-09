import React,{useState} from "react";
import SideBar from "../Sidebar";
import { LatestLoans } from "../LatestLoans";
import { LoanTable } from "../LoanTable";
import LoanRequestDrawer from "../LoanRequestDollar";


const Dash = ()=>{
    const [openDrawer,setOpenDrawer] = useState<boolean>(false)
    const handleSetDrawer = ()=>{
        setOpenDrawer(!openDrawer)
    }
    return(
        <div className="w-full h-screen gap-4 flex bg-transparent">
            <SideBar open={openDrawer} setOpen={handleSetDrawer} />
            <div className=" flex flex-col w-5/6 h-full p-4">
                <div className="h-1/2">
                <span className="text-2xl font-semibold">Good to see you, Make your decision count</span>
                <LatestLoans />
                </div>
               
                <div className="h-1/4">
                <LoanTable/>
                </div>
            </div>
            {openDrawer &&(
                <LoanRequestDrawer open={openDrawer} setOpen={handleSetDrawer} />
            )}


        </div>
    )
}
export default Dash