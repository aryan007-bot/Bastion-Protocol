import { useWallet } from '@solana/wallet-adapter-react';
import { useEffect } from 'react';

const DebugWallet = () => {
  const { connected, connecting, wallet, publicKey } = useWallet();

  useEffect(() => {
    console.log("Wallet Adapter:", wallet?.adapter?.name);
    console.log("Connecting:", connecting);
    console.log("Connected:", connected);
    console.log("Public Key:", publicKey?.toBase58());
  }, [wallet, connected, publicKey]);

  return null;
};

export default DebugWallet;
