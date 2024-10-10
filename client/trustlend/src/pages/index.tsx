//import Image from "next/image";
import localFont from "next/font/local";
//import ConnectButton from "@/components/connect";
import Header from "@/components/Header";
import HomeLand from "@/components/pages/Home";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home() {
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable}  min-h-screen w-full  bg-gradient-to-r from-[#5975FF] to-[#3029D9] font-[family-name:var(--font-geist-sans)]`}
    >
      <main className="min-h-screen">
      <Header/>
      <HomeLand/>

      </main>
    
     
     
    </div>
  );
}
