
import DashHeader from "@/components/DashHeader";
import Dash from "@/components/pages/Dash";
import UserLoans from "@/components/pages/loans";



export default function Home() {
  return (
    <div
      className={`  min-h-screen w-full  bg-gray-100 font-[family-name:var(--font-geist-sans)]`}
    >
      <main className="min-h-screen">
      <DashHeader/>
      <UserLoans/>
      
      
      

      </main>
    
     
     
    </div>
  );
}
