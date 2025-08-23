"use client"

import { useWallet } from "@solana/wallet-adapter-react"
import { useWalletModal } from "@solana/wallet-adapter-react-ui"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown, Wallet } from "lucide-react"
import { useCallback } from "react"

export function WalletConnectButton() {
  const { wallet, disconnect, publicKey, connecting, connected } = useWallet()
  const { setVisible } = useWalletModal()

  const handleConnect = useCallback(() => {
    setVisible(true)
  }, [setVisible])

  if (connecting) {
    return (
      <Button disabled className="rounded-full">
        Connecting...
      </Button>
    )
  }

  if (!connected || !publicKey) {
    return (
      <Button onClick={handleConnect} className="rounded-full bg-slate-100">
        <Wallet className="mr-2 size-4" />
        Connect Wallet
      </Button>
    )
  }

  const shortenAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="rounded-full bg-transparent">
          {shortenAddress(publicKey.toString())}
          <ChevronDown className="ml-1 size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={disconnect}>Disconnect</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
