import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import SolanaWalletProvider from './components/SolanaWalletProvider';
import { UserProvider } from './lib/UserContext';

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SolanaWalletProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </SolanaWalletProvider>
  </StrictMode>
);
