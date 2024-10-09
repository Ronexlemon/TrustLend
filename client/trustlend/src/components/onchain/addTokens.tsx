import React, { useState, useCallback } from "react";
import { Avatar, Name } from '@coinbase/onchainkit/identity';
import { 
  Transaction, 
  TransactionButton,
  TransactionSponsor,
  TransactionStatus,
  TransactionStatusAction,
  TransactionStatusLabel,
} from '@coinbase/onchainkit/transaction'; 
import type { LifecycleStatus } from '@coinbase/onchainkit/transaction';
import { useAccount } from 'wagmi';
import SideBar from "../Sidebar";
import { LatestLoans } from "../LatestLoans";
import { LoanTable } from "../LoanTable";
import LoanRequestDrawer from "../LoanRequestDollar";
import { TRUSTLENDCONTRACT } from "@/contracts/contract";
import { trustAbi } from "@/abi/TrustLend";
import { ConnectWallet, Wallet } from "@coinbase/onchainkit/wallet";

const linkusd = "0xb113F5A928BCfF189C998ab20d753a47F9dE5A61" as `0x${string}`;
const usdcud = "0xd30e2101a97dcbAeBCBC04F14C3f624E67A35165" as `0x${string}`;
const link = "0xE4aB69C077896252FAFBD49EFD26B5D171A32410" as `0x${string}`;
const usdc = "0x036CbD53842c5426634e7929541eC2318f3dCF7e" as `0x${string}`;

const contracts = [
  {
    address: TRUSTLENDCONTRACT as `0x${string}`,
    abi: trustAbi,
    functionName: 'setPriceFeed',
    args: [link, linkusd],
  },
];

export default function TransactionAddToken() {
  const { address } = useAccount();

  const handleOnStatus = useCallback((status: LifecycleStatus) => {
    console.log('LifecycleStatus', status);
  }, []);

  // Render the Transaction component or Wallet component based on address
  return (
    <>
      {address ? (
        <Transaction
          chainId={84532}
          contracts={contracts}
          onStatus={handleOnStatus}
        >
          <TransactionButton />
          <TransactionSponsor />
          <TransactionStatus>
            <TransactionStatusLabel />
            <TransactionStatusAction />
          </TransactionStatus>
        </Transaction>
      ) : (
        <Wallet>
          <ConnectWallet>
            <Avatar className='h-6 w-6' />
            <Name />
          </ConnectWallet>
        </Wallet>
      )}
    </>
  );
};
