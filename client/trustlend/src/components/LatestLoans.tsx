import * as React from "react";
import Image from "next/image";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useQuery } from '@tanstack/react-query';
import { request } from 'graphql-request';
import { formatEther, parseEther } from "viem";
import { BigNumberish, ethers } from "ethers";

///[{"id":"0xf73870ac55f24585f1615b41bf9f1a62fc67af8a038351715f1d987433d50ca064000000",
//"reg__borrower":"0x14580963582f4fb96b3a6d24eab6bec71b2448d8",
//"reg__loanId":"0x740c2cfb8150d0a3a8491074ec6c6fb26f7c27c6faf5124f4e5a893047a90761",
//"reg__collateralAmount":"1000000000000000000",
//"reg__borrowedAmount":"9572219901781623460",
//"reg__interest":"1063579989086847051",
//"reg__percentage":"10",
//"blockNumber":"16390901",
//"blockTimestamp":"1728550090"
//,"transactionHash":"0xf73870ac55f24585f1615b41bf9f1a62fc67af8a038351715f1d987433d50ca0"}]}

export interface RequestLoan{
  
  id : `0x${string}`;
  reg__borrower: `0x${string}`;
  reg__loanId: `0x${string}`;
  reg__collateralAmount: string;
  reg__borrowedAmount:string;
  reg__interest: string;
  reg__percentage: string;
  blockNumber: string;
  blockTimeStamp:string;
  transactionHash: `0x${string}`;
  

  
}
async function fetchRequestLoans() {
  const response = await fetch('/api/requestloans/loans', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const data = await response.json();
  return data.requestLoans;;
}



export function LatestLoans() {
  const { data, error, isLoading } = useQuery({
    queryKey: ['requestLoans'],
    queryFn: fetchRequestLoans,
  });
  console.log("data is data",data)

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
 
  return (
    <ScrollArea className="w-full whitespace-nowrap rounded-md border">
      <div className="flex w-max space-x-4 p-4">
        {data?.map((loan:RequestLoan) => (
          <Card className="w-60 h-64 flex flex-col" key={loan.id}>
            <CardHeader className="flex justify-center items-center h-1/3">
              <Avatar>
                <AvatarImage src={""} alt={`Loan Image for ${loan.id}`} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </CardHeader>
            <CardContent className="flex flex-col justify-center items-start h-1/3">
            <CardTitle className="text-sm font-semibold"> USDC - LINK</CardTitle>
              <CardTitle className="text-sm font-semibold">Requesting: { Number(formatEther(BigInt(loan.reg__borrowedAmount))).toFixed(5)} USDC</CardTitle>
              <CardDescription>Loan Percentage: {loan.reg__percentage} %</CardDescription>
              <CardDescription className="">Interest: {Number(formatEther(BigInt( loan.reg__interest))).toFixed(5)} Usdc</CardDescription>
              {/* <CardDescription>Duration: {loan.blockNumber} months</CardDescription> */}
              <CardDescription>Collateral: {formatEther(BigInt(loan.reg__collateralAmount))} LINK</CardDescription>
            </CardContent>
            <CardFooter className="w-full h-1/3">
              <Button className="bg-blue-500 w-full">Lend</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
