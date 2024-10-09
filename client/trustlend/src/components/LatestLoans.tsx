import * as React from "react";
import Image from "next/image";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export interface loans {
  id: `0x${string}`;
  image: string;
  loanPercentage: number;
  borrowedAmount: number;
  interestRate: number;
  duration: number;
  collateralAmount: number;
}

export const Loan: loans[] = [
  {
    id: "0x1a2b3c4d",
    image: "https://images.unsplash.com/photo-1465869185982-5a1a7522cbcb?auto=format&fit=crop&w=300&q=80",
    loanPercentage: 50,
    borrowedAmount: 1000,
    interestRate: 5,
    duration: 12, // in months
    collateralAmount: 100,
  },
  {
    id: "0x2b3c4d5e",
    image: "https://images.unsplash.com/photo-1465869185982-5a1a7522cbcb?auto=format&fit=crop&w=300&q=80",
    loanPercentage: 60,
    borrowedAmount: 2000,
    interestRate: 4.5,
    duration: 24,
    collateralAmount: 100,
  },
  {
    id: "0x3c4d5e6f",
    image: "https://images.unsplash.com/photo-1465869185982-5a1a7522cbcb?auto=format&fit=crop&w=300&q=80",
    loanPercentage: 55,
    borrowedAmount: 1500,
    interestRate: 5.2,
    duration: 18,
    collateralAmount: 100,
  },
  {
    id: "0x3c4d5e6fd",
    image: "https://images.unsplash.com/photo-1465869185982-5a1a7522cbcb?auto=format&fit=crop&w=300&q=80",
    loanPercentage: 55,
    borrowedAmount: 1500,
    interestRate: 5.2,
    duration: 18,
    collateralAmount: 100,
  },
  {
    id: "0x3c4d5e6fq",
    image: "https://images.unsplash.com/photo-1465869185982-5a1a7522cbcb?auto=format&fit=crop&w=300&q=80",
    loanPercentage: 55,
    borrowedAmount: 1500,
    interestRate: 5.2,
    duration: 18,
    collateralAmount: 100,
  },
  {
    id: "0x3c4d5e6fe",
    image: "https://images.unsplash.com/photo-1465869185982-5a1a7522cbcb?auto=format&fit=crop&w=300&q=80",
    loanPercentage: 55,
    borrowedAmount: 1500,
    interestRate: 5.2,
    duration: 18,
    collateralAmount: 100,
  },
  {
    id: "0x3c4d5e6fr",
    image: "https://images.unsplash.com/photo-1465869185982-5a1a7522cbcb?auto=format&fit=crop&w=300&q=80",
    loanPercentage: 55,
    borrowedAmount: 1500,
    interestRate: 5.2,
    duration: 18,
    collateralAmount: 100,
  },
  // Add more loans here...
];

export function LatestLoans() {
  return (
    <ScrollArea className="w-full whitespace-nowrap rounded-md border">
      <div className="flex w-max space-x-4 p-4">
        {Loan.map((loan) => (
          <Card className="w-60 h-64 flex flex-col" key={loan.id}>
            <CardHeader className="flex justify-center items-center h-1/3">
              <Avatar>
                <AvatarImage src={loan.image} alt={`Loan Image for ${loan.id}`} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </CardHeader>
            <CardContent className="flex flex-col justify-center items-start h-1/3">
            <CardTitle className="text-sm font-semibold"> USDC - LINK</CardTitle>
              <CardTitle className="text-sm font-semibold">{loan.borrowedAmount} USDC</CardTitle>
              <CardDescription>Loan Percentage: {loan.loanPercentage} %</CardDescription>
              <CardDescription className="">Interest: {loan.interestRate} Usdc</CardDescription>
              <CardDescription>Duration: {loan.duration} months</CardDescription>
              <CardDescription>Collateral: {loan.collateralAmount} LINK</CardDescription>
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
