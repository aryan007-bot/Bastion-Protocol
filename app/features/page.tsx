"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronRight, Menu, X, Moon, Sun, ArrowRight, Brain, Clock, Eye, Shield, Zap, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { useTheme } from "next-themes"
import { WalletConnectButton } from "@/components/wallet-connect-button"

export default function FeaturesPage() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const features = [
    {
      title: "AI Risk Engine",
      description:
        "Advanced machine learning algorithms analyze real-time market data, position health, and historical liquidation patterns to predict risks with 95% accuracy.",
      icon: <Brain className="size-6" />,
      details: [
        "Real-time position monitoring across 50+ DeFi protocols",
        "Machine learning models trained on 2+ years of liquidation data",
        "Multi-factor risk assessment including market volatility, liquidity depth, and correlation analysis",
        "Predictive alerts sent 15-30 minutes before potential liquidations",
      ],
    },
    {
      title: "Instant Claims",
      description:
        "Automated claim processing using smart contracts eliminates manual reviews and delivers payouts within minutes of liquidation events.",
      icon: <Clock className="size-6" />,
      details: [
        "Smart contract automation removes human intervention",
        "Claims processed in under 5 minutes on average",
        "Automatic verification using on-chain liquidation data",
        "No paperwork or manual claim submissions required",
      ],
    },
    {
      title: "On-Chain Transparency",
      description:
        "Every policy, claim, and payout is recorded on the Solana blockchain, providing complete transparency and immutable proof of all transactions.",
      icon: <Eye className="size-6" />,
      details: [
        "All policies stored as NFTs on Solana blockchain",
        "Public claim history and payout records",
        "Open-source smart contracts audited by leading security firms",
        "Real-time dashboard showing protocol health and reserves",
      ],
    },
  ]

  const additionalFeatures = [
    {
      title: "Multi-Protocol Coverage",
      description: "Support for major DeFi protocols including Solend, Mango Markets, and more.",
      icon: <Globe className="size-5" />,
    },
    {
      title: "Lightning Fast",
      description: "Built on Solana for sub-second transaction speeds and minimal fees.",
      icon: <Zap className="size-5" />,
    },
    {
      title: "Battle Tested",
      description: "Smart contracts audited by Trail of Bits and Quantstamp security firms.",
      icon: <Shield className="size-5" />,
    },
  ]

  return (
    <div className="flex min-h-[100dvh] flex-col">
      <header
        className={`sticky top-0 z-50 w-full backdrop-blur-lg transition-all duration-300 ${isScrolled ? "bg-background/80 shadow-sm" : "bg-transparent"}`}
      >
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold">
            <div className="size-8 rounded-lg bg-gradient-to-br from-gray-600 to-gray-300 flex items-center justify-center text-primary-foreground">
              B
            </div>
            <span>Bastion Protocol</span>
          </Link>
          <nav className="hidden md:flex gap-8">
            <Link
              href="/features"
              className="text-sm font-medium text-foreground transition-colors hover:text-foreground"
            >
              Features
            </Link>
            <Link
              href="/#testimonials"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Testimonials
            </Link>
            <Link
              href="/#pricing"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Premium Plans
            </Link>
            <Link
              href="/faq"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              FAQ
            </Link>
          </nav>
          <div className="hidden md:flex gap-4 items-center">
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full">
              {mounted && theme === "dark" ? <Sun className="size-[18px]" /> : <Moon className="size-[18px]" />}
              <span className="sr-only">Toggle theme</span>
            </Button>
            <WalletConnectButton />
            <Link href="/dashboard">
              <Button className="rounded-full bg-slate-50 ">
                Get Started
                <ChevronRight className="ml-1 size-4" />
              </Button>
            </Link>
          </div>
          <div className="flex items-center gap-4 md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full">
              {mounted && theme === "dark" ? <Sun className="size-[18px]" /> : <Moon className="size-[18px]" />}
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-20 md:py-32 overflow-hidden">
          <div className="container px-4 md:px-6 relative">
            <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-black bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <Badge className="mb-4 rounded-full px-4 py-1.5 text-sm font-medium" variant="secondary">
                Features
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                Advanced DeFi Protection
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Discover how Bastion Protocol's cutting-edge technology protects your leveraged positions with
                AI-powered risk assessment and instant claim processing.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Main Features */}
        <section className="w-full py-20 md:py-32">
          <div className="container px-4 md:px-6">
            <div className="space-y-20">
              {features.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className={`grid gap-12 lg:grid-cols-2 items-center ${i % 2 === 1 ? "lg:grid-flow-col-dense" : ""}`}
                >
                  <div className={i % 2 === 1 ? "lg:col-start-2" : ""}>
                    <div className="size-12 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary mb-6">
                      {feature.icon}
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">{feature.title}</h2>
                    <p className="text-lg text-muted-foreground mb-6">{feature.description}</p>
                    <ul className="space-y-3">
                      {feature.details.map((detail, j) => (
                        <li key={j} className="flex items-start gap-3">
                          <div className="size-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                          <span className="text-muted-foreground">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className={`relative ${i % 2 === 1 ? "lg:col-start-1" : ""}`}>
                    <Card className="overflow-hidden border-border/40 bg-gradient-to-b from-background to-muted/10 backdrop-blur">
                      <CardContent className="p-8">
                        <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center">
                          <div className="text-6xl opacity-50">{feature.icon}</div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Additional Features */}
        <section className="w-full py-20 md:py-32 bg-muted/30">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Built for DeFi</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Additional features that make Bastion Protocol the most comprehensive DeFi insurance solution.
              </p>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-3">
              {additionalFeatures.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <Card className="h-full overflow-hidden border-border/40 bg-gradient-to-b from-background to-muted/10 backdrop-blur transition-all hover:shadow-md">
                    <CardContent className="p-6 text-center">
                      <div className="size-10 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary mb-4 mx-auto">
                        {feature.icon}
                      </div>
                      <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-20 md:py-32  bg-slate-50   text-primary-foreground relative overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:4rem_4rem] "></div>
          <div className="container px-4 md:px-6 relative bg-slate-50">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">Ready to Protect Your Positions?</h2>
              <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
                Join thousands of DeFi traders who trust Bastion Protocol to safeguard their leveraged positions.
              </p>
              <Link href="/dashboard">
                <Button size="lg" variant="secondary" className="rounded-full h-12 px-8 text-base">
                  Get Started Now
                  <ArrowRight className="ml-2 size-4" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  )
}
