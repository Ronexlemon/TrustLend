import React from "react"
import { Button } from "./ui/button"

const Header =()=>{
    return(
        <div className="bg-gradient-to-r from-[#5975FF] to-[#3029D9] h-24 w-full flex justify-around items-center">
            <div className="flex w-1/3 justify-start items-center text-white text-3xl font-bold">
               
                <h2 className="text-4xl">TRUSTLEND</h2>

            </div>
            <div className="flex justify-center w-1/3 gap-4 items-center ">
                <Button variant="link" className="text-gray-300 hover:text-white ">Home</Button>

                <Button variant="link" className="text-gray-300 hover:text-white ">About Us</Button>
                <Button variant="link" className="text-gray-300 hover:text-white ">How it works</Button>
                <Button variant="link" className="text-gray-300 hover:text-white ">Our Services</Button>
                
            </div>
            <div className="flex justify-end items-end w-1/3">
            <Button>Contact Us</Button>

            </div>

        </div>
    )
}

export default Header