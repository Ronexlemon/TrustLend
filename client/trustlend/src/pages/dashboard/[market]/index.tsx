import Image from "next/image";
import localFont from "next/font/local";
import ConnectButton from "@/components/connect";
import Header from "@/components/Header";
import HomeLand from "@/components/pages/Home";
import DashHeader from "@/components/DashHeader";
import Dash from "@/components/pages/Dash";



export default function Home() {
  return (
    <div
      className={`  min-h-screen w-full  bg-gray-100 font-[family-name:var(--font-geist-sans)]`}
    >
      <main className="min-h-screen">
      <DashHeader/>
      <Dash/>
      
      

      </main>
    
     
     
    </div>
  );
}
