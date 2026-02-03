'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { 
  Home, 
  Search, 
  ArrowLeft, 
  Pill, 
  Stethoscope, 
  Heart,
  ShoppingBag,
  Phone,
  Mail,
  MapPin,
  Clock
} from 'lucide-react'
import { TextEffect } from '@/components/ui/text-effect'
import { AnimatedGroup } from '@/components/ui/animated-group'

const transitionVariants = {
  item: {
    hidden: {
      opacity: 0,
      filter: 'blur(12px)',
      y: 12,
    },
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      y: 0,
      transition: {
        type: 'spring' as const,
        bounce: 0.3,
        duration: 1.5,
      },
    },
  },
}

const quickLinks = [
  {
    title: 'Shop Medicines',
    description: 'Browse our extensive medicine catalog',
    href: '/shop',
    icon: Pill,
    color: 'bg-blue-500/10 hover:bg-blue-500/20',
    iconColor: 'text-blue-600',
  },
  {
    title: 'Consult Doctor',
    description: 'Get expert medical advice online',
    href: '/consult',
    icon: Stethoscope,
    color: 'bg-green-500/10 hover:bg-green-500/20',
    iconColor: 'text-green-600',
  },
  {
    title: 'Health Categories',
    description: 'Explore medicines by category',
    href: '/shop?category=all',
    icon: Heart,
    color: 'bg-red-500/10 hover:bg-red-500/20',
    iconColor: 'text-red-600',
  },
  {
    title: 'My Orders',
    description: 'Track your medicine orders',
    href: '/dashboard/order',
    icon: ShoppingBag,
    color: 'bg-purple-500/10 hover:bg-purple-500/20',
    iconColor: 'text-purple-600',
  },
]

const helpOptions = [
  {
    icon: Phone,
    title: 'Call Us',
    description: '+880 1700-000000',
    action: 'tel:+880-1700-000000',
  },
  {
    icon: Mail,
    title: 'Email Support',
    description: 'support@medistore.com',
    action: 'mailto:support@medistore.com',
  },
  {
    icon: MapPin,
    title: 'Visit Us',
    description: '123 Dhanmondi, Dhaka',
    action: '#',
  },
]

export default function NotFoundComponent() {
  const [searchQuery, setSearchQuery] = useState('')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/shop?search=${encodeURIComponent(searchQuery.trim())}`
    }
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-blue-950/20 dark:via-background dark:to-green-950/20">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="text-center">
          {/* 404 Animation */}
          <AnimatedGroup
            variants={{
              container: {
                visible: {
                  transition: {
                    staggerChildren: 0.1,
                    delayChildren: 0.2,
                  },
                },
              },
              ...transitionVariants,
            }}
          >
            <div className="mb-8">
              <div className="relative inline-block">
                <TextEffect
                  preset="fade-in-blur"
                  speedSegment={0.3}
                  as="h1"
                  className="text-9xl font-bold text-primary/20 select-none"
                >
                  404
                </TextEffect>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="p-6 rounded-full bg-primary/10">
                    <Pill className="h-16 w-16 text-primary animate-pulse" />
                  </div>
                </div>
              </div>
            </div>

            {/* Main Message */}
            <TextEffect
              preset="fade-in-blur"
              speedSegment={0.3}
              delay={0.5}
              as="h2"
              className="text-3xl font-bold text-foreground mb-4 sm:text-4xl"
            >
              Oops! Page Not Found
            </TextEffect>

            <TextEffect
              per="line"
              preset="fade-in-blur"
              speedSegment={0.3}
              delay={0.7}
              as="p"
              className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto"
            >
              The page you're looking for seems to have taken a different route. 
              Don't worry, we'll help you find what you need for your health and wellness.
            </TextEffect>

            {/* Search Bar */}
            <div className="mb-12 max-w-md mx-auto">
              <form onSubmit={handleSearch} className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search for medicines..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button type="submit" disabled={!searchQuery.trim()}>
                  Search
                </Button>
              </form>
            </div>

            {/* Navigation Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button asChild size="lg" className="rounded-lg">
                <Link href="/">
                  <Home className="mr-2 h-5 w-5" />
                  Back to Home
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-lg">
                <Link href="/shop">
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Shop Medicines
                </Link>
              </Button>
            </div>
          </AnimatedGroup>

          {/* Quick Links */}
          <AnimatedGroup
            variants={{
              container: {
                visible: {
                  transition: {
                    staggerChildren: 0.1,
                    delayChildren: 1.0,
                  },
                },
              },
              ...transitionVariants,
            }}
          >
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-foreground mb-8">
                Popular Destinations
              </h3>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {quickLinks.map((link, index) => (
                  <Link key={index} href={link.href}>
                    <Card className={`group transition-all duration-300 hover:shadow-lg hover:scale-[1.02] ${link.color} border-0`}>
                      <CardContent className="p-6 text-center">
                        <div className="p-3 rounded-lg bg-white/50 dark:bg-black/20 mb-4 inline-block">
                          <link.icon className={`h-6 w-6 ${link.iconColor}`} />
                        </div>
                        <h4 className="font-semibold text-foreground mb-2">
                          {link.title}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {link.description}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </AnimatedGroup>

          {/* Help Section */}
          <AnimatedGroup
            variants={{
              container: {
                visible: {
                  transition: {
                    staggerChildren: 0.1,
                    delayChildren: 1.2,
                  },
                },
              },
              ...transitionVariants,
            }}
          >
            <Card className="max-w-4xl mx-auto bg-muted/30 border-0">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-foreground mb-6">
                  Need Help? We're Here for You
                </h3>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  {helpOptions.map((option, index) => (
                    <a
                      key={index}
                      href={option.action}
                      className="flex items-center gap-4 p-4 rounded-lg bg-white/50 dark:bg-black/20 hover:bg-white/70 dark:hover:bg-black/30 transition-colors"
                    >
                      <div className="p-2 rounded-lg bg-primary/10">
                        <option.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="text-left">
                        <h4 className="font-semibold text-foreground">
                          {option.title}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {option.description}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
                
                <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                  <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 mb-2">
                    <Clock className="h-4 w-4" />
                    <span className="font-semibold">24/7 Support Available</span>
                  </div>
                  <p className="text-sm text-blue-600/80 dark:text-blue-400/80">
                    Our customer support team is available round the clock to help you with any questions about medicines, orders, or health consultations.
                  </p>
                </div>
              </CardContent>
            </Card>
          </AnimatedGroup>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[50%] top-0 ml-[-40rem] h-[25rem] w-[81.25rem] dark:[mask-image:linear-gradient(white,transparent)]">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-300/20 to-green-300/20 opacity-40 [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] dark:from-blue-400/20 dark:to-green-400/20"></div>
        </div>
      </div>
    </div>
  )
}