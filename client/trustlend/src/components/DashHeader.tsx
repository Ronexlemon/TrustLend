// Header.jsx
import React from 'react';
import { useRouter } from 'next/router';
import ConnectButton from './connect';


const DashHeader = () => {
  

  return (
    <div className="bg-gray-100 h-24 w-full flex  justify-between  border-b border-gray-400 items-center">
        <div className='flex justify-around w-1/2'>
            <span className='text-black font-bold'>TrustLend</span>
            <span className='text-gray-500'>Link <span className='text-black font-bold'>5000.000</span></span>
            <span className='text-gray-500'>USDC <span className='text-black font-bold'>$ 5000.000</span></span>
        </div>
        <div className='justify-end'>
           <ConnectButton/>
        </div>
        
      </div>
  );
};

export default DashHeader;
