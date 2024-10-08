import "@/styles/globals.css";
import '@coinbase/onchainkit/styles.css';
import type { AppProps } from "next/app";
import { OnchainKitProvider } from '@coinbase/onchainkit'; 

import { mainnet, optimism } from 'wagmi/chains'
import { injected, metaMask, safe, walletConnect } from 'wagmi/connectors'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { http, cookieStorage, createConfig, createStorage } from 'wagmi';
import { base } from 'wagmi/chains'; 
import { coinbaseWallet } from 'wagmi/connectors';



const projectId = 'b40a827ad95a369e3b4af6fcd1904bb7'

 const config = createConfig({
  chains: [base], 
  connectors: [
    coinbaseWallet({
      appName: "OnchainKit",
      preference: 'smartWalletOnly',
      version: '4',
    }),
  ],
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
  transports: {
    [base
.id]: http(), 
  },
});

const queryClient = new QueryClient();

function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
      <OnchainKitProvider
          apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
          chain={base}
        > </OnchainKitProvider>
        
          
            <Component {...pageProps} />
          
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;