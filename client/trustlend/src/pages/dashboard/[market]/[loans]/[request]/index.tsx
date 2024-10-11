
import DashHeader from "@/components/DashHeader";
import Dash from "@/components/pages/Dash";

import UserRequest from "@/components/pages/userRequests";



export default function Home() {
  return (
    <div
      className={`  min-h-screen w-full  bg-gray-100 font-[family-name:var(--font-geist-sans)]`}
    >
      <main className="min-h-screen">
      <DashHeader/>
      <UserRequest/>
      
      

      </main>
    
     
     
    </div>
  );
}
