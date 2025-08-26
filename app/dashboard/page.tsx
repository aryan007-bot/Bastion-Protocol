"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Shield,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Wallet,
  Clock,
  DollarSign,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletConnectButton } from "@/components/wallet-connect-button";

export default function Dashboard() {
  const { connected, publicKey } = useWallet();
  const [policyActive, setPolicyActive] = useState(false);
  const [riskLevel, setRiskLevel] = useState<"low" | "medium" | "high">("low");
  const [protectedAmount, setProtectedAmount] = useState(0);
  const [claimProcessing, setClaimProcessing] = useState(false);

  // Simulate risk level changes
  useEffect(() => {
    const interval = setInterval(() => {
      const risks: ("low" | "medium" | "high")[] = ["low", "medium", "high"];
      setRiskLevel(risks[Math.floor(Math.random() * risks.length)]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleBuyInsurance = () => {
    setPolicyActive(true);
    setProtectedAmount(1500);
  };

  const handleClaimNow = () => {
    setClaimProcessing(true);
    setTimeout(() => {
      setClaimProcessing(false);
      alert("Claim processed successfully! Payout sent to your wallet.");
    }, 3000);
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low":
        return "text-green-500";
      case "medium":
        return "text-yellow-500";
      case "high":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  const getRiskProgress = (risk: string) => {
    switch (risk) {
      case "low":
        return 25;
      case "medium":
        return 60;
      case "high":
        return 90;
      default:
        return 0;8
    }
  };

  if (!connected) {
    return (
      <div className="relative min-h-screen bg-black overflow-hidden text-white">
        {/* ✅ Grid background */}
        <div
          className="absolute inset-0 -z-10"
          style={{
            backgroundImage: `
            radial-gradient(circle 400px at center, rgba(255, 255, 255, 0.02), transparent 100%),
            linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)
          `,
            backgroundSize: "40px 40px",
            backgroundColor: "#000",
          }}
        ></div>

        {/* ✅ Header with "B" logo and Bastion Protocol */}
        <div className="p-6 flex items-center space-x-2">
          <div className="size-8 rounded-lg bg-gradient-to-br from-gray-600 to-gray-300 flex items-center justify-center text-black font-semibold">
            B
          </div>
          <span className="text-lg font-medium text-white">
            Bastion Protocol
          </span>
        </div>

        {/* ✅ Hero content */}
        <div className="flex flex-col items-center justify-center text-center px-6 mt-20 space-y-6">
          <span className="bg-white text-black text-xs font-medium px-4 py-1 rounded-full">
            Powered by Solana
          </span>

          <h1 className="text-4xl sm:text-5xl font-extrabold">
            Decentralized AI Insurance
            <br />
            for DeFi Traders
          </h1>

          <p className="max-w-2xl text-gray-400 text-base sm:text-lg">
            Bastion Protocol protects leveraged positions from liquidation with
            real-time data, AI risk assessment, and instant claim processing.
          </p>

          {/* ✅ Wallet Connect and Dashboard buttons */}
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            {/* Wallet Connect Button */}
            <WalletConnectButton />

            {/* View Dashboard */}
            <Link
              href="#"
              className="border border-white text-white font-medium px-6 py-3 rounded-full inline-flex items-center hover:bg-white hover:text-black transition"
            >
              View Dashboard
            </Link>
          </div>

          {/* Footer text */}
          <div className="text-xs text-gray-500 pt-6 space-x-4">
            <span>✓ No KYC required</span>
            <span>✓ Instant payouts</span>
            <span>✓ On-chain transparency</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-black bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>

      <header className="border-b bg-background/95 backdrop-blur-sm relative z-10">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 font-bold">
              <div className="size-8 rounded-lg bg-gradient-to-br from-gray-500 to-gray-200 flex items-center justify-center text-primary-foreground">
                B
              </div>
              <span>Bastion Protocol</span>
            </Link>
            <Badge variant="secondary">Dashboard</Badge>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="mr-2 size-4" />
                Back Home
              </Button>
            </Link>
            <WalletConnectButton />
          </div>
        </div>
      </header>

      <main className="container py-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-12"
        >
          <div className="space-y-4">
            <h1 className="text-4xl font-bold">Insurance Dashboard</h1>
            <p className="text-muted-foreground text-lg">
              Monitor your DeFi positions and manage your insurance policies
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Policy Status
                </CardTitle>
                <Shield className="size-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {policyActive ? (
                    <span className="text-green-500">Active</span>
                  ) : (
                    <span className="text-muted-foreground">Inactive</span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  {policyActive
                    ? "Your positions are protected"
                    : "No active policies"}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Risk Level
                </CardTitle>
                <AlertTriangle
                  className={`size-4 ${getRiskColor(riskLevel)}`}
                />
              </CardHeader>
              <CardContent>
                <div
                  className={`text-2xl font-bold capitalize ${getRiskColor(
                    riskLevel
                  )}`}
                >
                  {riskLevel}
                </div>
                <Progress value={getRiskProgress(riskLevel)} className="mt-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Protected Amount
                </CardTitle>
                <DollarSign className="size-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ${protectedAmount.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  Maximum coverage limit
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Claims Processed
                </CardTitle>
                <CheckCircle className="size-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0</div>
                <p className="text-xs text-muted-foreground">
                  Total successful claims
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>AI Risk Analysis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Market Volatility</span>
                  <Badge
                    variant={riskLevel === "high" ? "destructive" : "secondary"}
                  >
                    {riskLevel === "high" ? "High" : "Normal"}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Position Health</span>
                  <Badge
                    variant={riskLevel === "low" ? "default" : "secondary"}
                  >
                    {riskLevel === "low" ? "Healthy" : "Monitor"}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">
                    Liquidation Distance
                  </span>
                  <span className="text-sm font-medium">
                    {riskLevel === "high"
                      ? "5%"
                      : riskLevel === "medium"
                      ? "15%"
                      : "25%"}
                  </span>
                </div>
                <div className="pt-4">
                  <p className="text-sm text-muted-foreground">
                    Our AI continuously monitors your positions across all
                    connected protocols.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {!policyActive ? (
                  <Button
                    onClick={handleBuyInsurance}
                    className="w-full bg-slate-50"
                    size="lg"
                  >
                    <Shield className="mr-2  size-4" />
                    Buy Insurance Policy
                  </Button>
                ) : (
                  <Button
                    onClick={handleClaimNow}
                    variant={riskLevel === "high" ? "destructive" : "secondary"}
                    disabled={claimProcessing}
                    className="w-full"
                    size="lg"
                  >
                    {claimProcessing ? (
                      <>
                        <Clock className="mr-2 size-4 animate-spin" />
                        Processing Claim...
                      </>
                    ) : (
                      <>
                        <TrendingUp className="mr-2 size-4" />
                        File Insurance Claim
                      </>
                    )}
                  </Button>
                )}

                <Button
                  variant="outline"
                  className="w-full bg-transparent"
                  size="lg"
                >
                  <Wallet className="mr-2 size-4" />
                  View Transaction History
                </Button>

                <div className="pt-6 text-center space-y-2 border-t border-border/40">
                  <p className="text-sm font-medium text-foreground">
                    Connected to Solana Devnet
                  </p>
                  <p className="text-xs text-muted-foreground font-mono bg-muted px-2 py-1 rounded">
                    {publicKey?.toString().slice(0, 8)}...
                    {publicKey?.toString().slice(-8)}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {policyActive ? (
                  <div className="flex items-center gap-4 p-4 border rounded-lg">
                    <CheckCircle className="size-5 text-green-500" />
                    <div className="flex-1">
                      <p className="font-medium">Insurance Policy Activated</p>
                      <p className="text-sm text-muted-foreground">
                        Coverage: $1,500 • Premium: $15/month
                      </p>
                    </div>
                    <Badge>Active</Badge>
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Shield className="size-12 mx-auto mb-4 opacity-50" />
                    <p>No recent activity</p>
                    <p className="text-sm">
                      Purchase insurance to start protecting your positions
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}
