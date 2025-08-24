'use client';

import { useEffect, useState } from 'react';

declare global {
  interface Window {
    solana?: any;
  }
}

export default function PhantomConnect() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const connectWallet = async () => {
    try {
      const { solana } = window;

      if (!solana || !solana.isPhantom) {
        alert('Phantom Wallet not found. Install it from https://phantom.app');
        return;
      }

      // This must be called from a user gesture (like button click)
      const response = await solana.connect();
      setWalletAddress(response.publicKey.toString());
      setError(null); // clear old errors
    } catch (err: any) {
      console.error("Phantom connect error:", err);
      if (err.code === 4001) {
        setError("User rejected the connection request.");
      } else {
        setError(err.message || 'Unexpected error occurred.');
      }
    }
  };

  useEffect(() => {
    const checkAutoConnect = async () => {
      try {
        const { solana } = window;

        if (solana?.isPhantom) {
          const res = await solana.connect({ onlyIfTrusted: true });
          setWalletAddress(res.publicKey.toString());
        }
      } catch (err) {
        // Not auto-connected — that's okay
      }
    };

    checkAutoConnect();
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <button
        onClick={connectWallet}
        style={{
          padding: '12px 24px',
          backgroundColor: '#8c52ff',
          color: 'white',
          fontSize: '18px',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
        }}
      >
        {walletAddress ? 'Wallet Connected ✅' : 'Connect Wallet'}
      </button>

      {walletAddress && (
        <div style={{ marginTop: '20px' }}>
          <p><strong>Wallet Address:</strong></p>
          <code>{walletAddress}</code>
        </div>
      )}

      {error && (
        <div style={{ color: 'red', marginTop: '10px' }}>
          <strong>Error:</strong> {error}
        </div>
      )}
    </div>
  );
}
