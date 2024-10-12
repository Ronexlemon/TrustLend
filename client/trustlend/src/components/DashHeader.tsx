// Header.tsx
import React, { useEffect, useState, useMemo } from 'react';
import ConnectButton from './connect';
import { erc20Abi } from '@/abi/TrustLend';
import { ProviderRpc } from '@/constant/provider';
import { ethers, Contract } from 'ethers';
import { usdc, link } from './onchain/addTokens';
import { useAccount } from 'wagmi';
import { Button } from './ui/button';
import { useRouter } from "next/router";

const DashHeader = () => {
  const { address, isConnected } = useAccount();
  const router = useRouter();
 

  // Function to handle navigation
  
  const [usdcBalance, setUSDCBalance] = useState<string | null>(null);
  const [linkBalance, setLinkBalance] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const provider = useMemo(() => new ethers.JsonRpcProvider(ProviderRpc), []);
  const usdcContract = useMemo(() => new Contract(usdc, erc20Abi, provider), [provider]);
  const linkContract = useMemo(() => new Contract(link, erc20Abi, provider), [provider]);

  const handleNavigation = (path:string) => {
    router.push(path);
  };

  useEffect(() => {
    const getBalances = async () => {
      try {
        if (isConnected && address) {
          setLoading(true);
          setError("");

          const [usdcBal, linkBal] = await Promise.all([
            usdcContract.balanceOf(address),
            linkContract.balanceOf(address),
          ]);

          // Convert to readable units and set state
          setUSDCBalance(ethers.formatUnits(usdcBal, 6)); // USDC typically uses 6 decimals
          setLinkBalance(ethers.formatUnits(linkBal, 18)); // LINK typically uses 18 decimals
        }
      } catch (err) {
        setError("Failed to fetch balances. Please try again later.");
        console.error("Balance fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (isConnected) {
      getBalances();
    }

    return () => {
      setLoading(false); // Clean up loading state on component unmount
    };
  }, [isConnected, address, usdcContract, linkContract]);

  const renderBalance = (balance: string | null) => {
    return balance ? parseFloat(balance).toFixed(2) : "0.00";
  };

  return (
    <div className="bg-gray-100 h-24 w-full flex justify-between border-b border-gray-400 items-center">
      <div className="flex justify-around w-1/2">
        <Button  onClick={() => handleNavigation("/")}variant="link" className="text-blue-500 text-3xl font-bold">TrustLend</Button>

        {/* Display LINK balance or loading/error states */}
        <span className="text-gray-500">
          LINK: 
          {loading ? (
            <span className="text-black font-bold ml-2">Loading...</span>
          ) : error ? (
            <span className="text-red-500 ml-2">{error}</span>
          ) : (
            <span className="text-black font-bold ml-2">{renderBalance(linkBalance)}</span>
          )}
        </span>

        {/* Display USDC balance or loading/error states */}
        <span className="text-gray-500">
          USDC: 
          {loading ? (
            <span className="text-black font-bold ml-2">Loading...</span>
          ) : error ? (
            <span className="text-red-500 ml-2">{error}</span>
          ) : (
            <span className="text-black font-bold ml-2">${renderBalance(usdcBalance)}</span>
          )}
        </span>
      </div>

      <div className="justify-end">
        <ConnectButton />
      </div>
    </div>
  );
};

export default DashHeader;
