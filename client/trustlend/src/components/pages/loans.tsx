import React,{useState} from "react";
import { useCallback } from 'react';
import { Avatar, Name } from '@coinbase/onchainkit/identity';
import { 
  Transaction, 
  TransactionButton,
  TransactionSponsor,
  TransactionStatus,
  TransactionStatusAction,
  TransactionStatusLabel,
} from '@coinbase/onchainkit/transaction'; 
import type { LifecycleStatus } from '@coinbase/onchainkit/transaction';
import { useAccount } from 'wagmi';
import SideBar from "../Sidebar";
import { LatestLoans } from "../LatestLoans";
import { LoanTable } from "../LoanTable";
import LoanRequestDrawer from "../LoanRequestDollar";
import { TRUSTLENDCONTRACT } from "@/contracts/contract";
import { trustAbi } from "@/abi/TrustLend";
import { UserIssueLoans } from "../userIssueLoans";


 const contracts = [
    {
      address: TRUSTLENDCONTRACT,
      abi: trustAbi,
      functionName: 'click',
      args: [],
    },
  ];
const UserLoans = ()=>{
    const { address } = useAccount();
    const [openDrawer,setOpenDrawer] = useState<boolean>(false)
    const handleSetDrawer = ()=>{
        setOpenDrawer(!openDrawer)
    }
   
  
  const handleOnStatus = useCallback((status: LifecycleStatus) => {
    console.log('LifecycleStatus', status);
  }, []);

//   const handleTX = ()=>{
//     <Transaction
//   chainId={BASE_SEPOLIA_CHAIN_ID}
//   contracts={TRUSTLENDCONTRACT}
//   onStatus={handleOnStatus}
// >
//   <TransactionButton />
//   <TransactionSponsor />
//   <TransactionStatus>
//     <TransactionStatusLabel />
//     <TransactionStatusAction />
//   </TransactionStatus
// >
// </Transaction> 
//   }
    return(
        <div className="w-full h-screen gap-4 flex bg-transparent">
            <SideBar open={openDrawer} setOpen={handleSetDrawer} />
            <div className=" flex flex-col w-5/6 h-full p-4">
                <div className="h-1/2">
                <span className="text-2xl font-semibold">Good to see you, Make your decision count</span>
                <UserIssueLoans/>
                </div>
               
                {/* <div className="h-1/4">
                <LoanTable/>
                </div> */}
            </div>
            {openDrawer &&(
                <LoanRequestDrawer open={openDrawer} setOpen={handleSetDrawer} />
            )}


        </div>
    )
}
export default UserLoans