'use client';

import { useState } from 'react';

export default function TestPhantom() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  const connectDirectly = async () => {
    try {
      const { solana } = window as any;

      if (!solana?.isPhantom) {
        alert('Phantom not found. Install it from https://phantom.app');
        return;
      }

      const res = await solana.connect();
      setWalletAddress(res.publicKey.toString());
    } catch (err: any) {
      console.error('Phantom direct connect error:', err);
      alert('Error: ' + (err.message || 'Unexpected error'));
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '80px' }}>
      <button
        onClick={connectDirectly}
        style={{
          padding: '12px 24px',
          fontSize: '16px',
          backgroundColor: '#8c52ff',
          color: 'white',
          borderRadius: '8px',
        }}
      >
        Connect Phantom Directly
      </button>

      {walletAddress && (
        <div style={{ marginTop: '20px' }}>
          Connected ✅: <br />
          <code>{walletAddress}</code>
        </div>
      )}
    </div>
  );
}
