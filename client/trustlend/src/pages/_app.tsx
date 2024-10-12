
import "@/styles/globals.css";
import '@coinbase/onchainkit/styles.css';
import type { AppProps } from "next/app";
import { OnchainKitProvider } from '@coinbase/onchainkit'; 

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { http, cookieStorage, createConfig, createStorage } from 'wagmi';
import { base, baseSepolia } from 'wagmi/chains'; 
import { coinbaseWallet } from 'wagmi/connectors';

//const projectId = 'b40a827ad95a369e3b4af6fcd1904bb7';

// Create a QueryClient instance
const queryClient = new QueryClient();

const config = createConfig({
  chains: [base, baseSepolia],
  connectors: [
    coinbaseWallet({
      appName: 'TrustLend',
      preference: 'smartWalletOnly',
      
    }),
  ],
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
  transports: {
    [base.id]: http(),
    [baseSepolia.id]: http(),
  },
});

function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <OnchainKitProvider
          apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
          chain={baseSepolia}
        >
          <Component {...pageProps} />
        </OnchainKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
