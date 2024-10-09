import React from "react";
import { Button } from "../ui/button"
import { useRouter } from "next/router";



const HomeLand = ()=>{
    const router = useRouter()
    return(
        <div className="h-screen w-full ">
            <div className="grid grid-cols-2  items-center justify-center h-3/4 w-full">
                <div className=" flex flex-col col-span-1 gap-4 justify-center items-start">
                    <h1 className="text-9xl  text-white">
                        Financial

                    </h1>
                    <h1 className="text-9xl text-white">
                        Solutions

                    </h1>

                    <div>
                        <span className="text-gray-100">
                        Inclusion in finance is more than just access—it's about enabling individuals to <br/>thrive and take  control of their economic futures.
                        </span>

                    </div>
                    <div className="">
                        <Button onClick={()=>router.replace("/dashboard/market")}>GET START</Button>
                        </div>

                </div>

            </div>

        </div>

    )
}

export default HomeLand