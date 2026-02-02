'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Video, MessageCircle, Phone, Clock, Shield, Award } from 'lucide-react'
import Link from 'next/link'
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

const consultationMethods = [
  {
    icon: Video,
    title: 'Video Call',
    description: 'Face-to-face consultation with doctors',
    color: 'bg-blue-500/10 hover:bg-blue-500/20',
    iconColor: 'text-blue-600',
  },
  {
    icon: MessageCircle,
    title: 'Chat',
    description: 'Text-based consultation for quick queries',
    color: 'bg-green-500/10 hover:bg-green-500/20',
    iconColor: 'text-green-600',
  },
  {
    icon: Phone,
    title: 'Voice Call',
    description: 'Audio consultation for privacy',
    color: 'bg-purple-500/10 hover:bg-purple-500/20',
    iconColor: 'text-purple-600',
  },
]

const features = [
  {
    icon: Clock,
    text: '24/7 Available',
  },
  {
    icon: Shield,
    text: 'Secure & Private',
  },
  {
    icon: Award,
    text: 'Licensed Doctors',
  },
]

export default function ConsultHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-blue-950/20 dark:via-background dark:to-green-950/20">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-32">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Column - Content */}
          <div className="flex flex-col justify-center">
            <TextEffect
              preset="fade-in-blur"
              speedSegment={0.3}
              as="h1"
              className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
            >
              Consult Expert Doctors Online
            </TextEffect>
            
            <TextEffect
              per="line"
              preset="fade-in-blur"
              speedSegment={0.3}
              delay={0.5}
              as="p"
              className="mt-6 text-lg leading-8 text-muted-foreground"
            >
              Get professional medical advice from licensed doctors anytime, anywhere. 
              Book consultations, get prescriptions, and manage your health with expert care.
            </TextEffect>

            {/* Features */}
            <AnimatedGroup
              variants={{
                container: {
                  visible: {
                    transition: {
                      staggerChildren: 0.1,
                      delayChildren: 0.8,
                    },
                  },
                },
                ...transitionVariants,
              }}
              className="mt-8"
            >
              <div className="flex flex-wrap gap-6">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <feature.icon className="h-5 w-5 text-primary" />
                    <span className="text-sm font-medium text-foreground">
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>
            </AnimatedGroup>

            {/* CTA Buttons */}
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
              className="mt-10"
            >
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button asChild size="lg" className="rounded-lg">
                  <Link href="#doctors">
                    Book Consultation
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-lg">
                  <Link href="#how-it-works">
                    How It Works
                  </Link>
                </Button>
              </div>
            </AnimatedGroup>
          </div>

          {/* Right Column - Consultation Methods */}
          <div className="flex items-center justify-center">
            <AnimatedGroup
              variants={{
                container: {
                  visible: {
                    transition: {
                      staggerChildren: 0.2,
                      delayChildren: 0.6,
                    },
                  },
                },
                ...transitionVariants,
              }}
              className="w-full max-w-md"
            >
              <div className="space-y-4">
                {consultationMethods.map((method, index) => (
                  <Card 
                    key={index} 
                    className={`transition-all duration-300 hover:shadow-lg hover:scale-[1.02] ${method.color} border-0`}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-lg bg-white/50 dark:bg-black/20`}>
                          <method.icon className={`h-6 w-6 ${method.iconColor}`} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">
                            {method.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {method.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </AnimatedGroup>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[50%] top-0 ml-[-40rem] h-[25rem] w-[81.25rem] dark:[mask-image:linear-gradient(white,transparent)]">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-300/30 to-green-300/30 opacity-40 [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] dark:from-blue-400/30 dark:to-green-400/30"></div>
        </div>
      </div>
    </section>
  )
}