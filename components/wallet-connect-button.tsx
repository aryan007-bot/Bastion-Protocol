'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { ChevronDown, ChevronRight } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useCallback, useMemo } from 'react';

export function WalletConnectButton() {
  const { wallet, disconnect, publicKey, connecting, connected } = useWallet();
  const { setVisible } = useWalletModal();

  const handleConnect = useCallback(() => {
    setVisible(true);
  }, [setVisible]);

  const shortAddress = useMemo(() => {
    if (!publicKey) return '';
    const addr = publicKey.toBase58();
    return `${addr.slice(0, 4)}...${addr.slice(-4)}`;
  }, [publicKey]);

  const buttonStyle =
    'inline-flex items-center justify-center rounded-full bg-white px-6 py-2 text-sm font-medium text-black hover:bg-gray-300 transition';

  if (connecting) {
    return (
      <button className={buttonStyle} disabled>
        Connecting...
      </button>
    );
  }

  if (!connected || !publicKey) {
    return (
      <button onClick={handleConnect} className={buttonStyle}>
        Connect Wallet
        <ChevronRight className="ml-2 h-4 w-4" />
      </button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className={buttonStyle}>
          {shortAddress}
          <ChevronDown className="ml-2 h-4 w-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={disconnect}>Disconnect</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
