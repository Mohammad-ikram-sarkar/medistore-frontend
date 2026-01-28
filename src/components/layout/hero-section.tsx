import React from 'react'
import {  Heart, Package, Clock, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { TextEffect } from '@/components/ui/text-effect'
import { AnimatedGroup } from '@/components/ui/animated-group'
import Link from 'next/link'


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

export default function HeroSection() {
    return (
        <>
            

            <main className="overflow-hidden [--color-primary-foreground:var(--color-white)] [--color-primary:var(--color-blue-600)]">
                <section>
                    <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-32 lg:pt-48">
                        <div className="relative z-10 mx-auto max-w-4xl text-center">
                            <TextEffect
                                preset="fade-in-blur"
                                speedSegment={0.3}
                                as="h1"
                                className="text-balance text-5xl font-medium md:text-6xl">
                                Your Health, Our Priority
                            </TextEffect>
                            <TextEffect
                                per="line"
                                preset="fade-in-blur"
                                speedSegment={0.3}
                                delay={0.5}
                                as="p"
                                className="mx-auto mt-6 max-w-2xl text-pretty text-lg">
                                Access trusted medicines and healthcare products. Fast delivery, expert advice, and 24/7 support for your wellness journey.
                            </TextEffect>

                            <AnimatedGroup
                                variants={{
                                    container: {
                                        visible: {
                                            transition: {
                                                staggerChildren: 0.05,
                                                delayChildren: 0.75,
                                            },
                                        },
                                    },
                                    ...transitionVariants,
                                }}
                                className="mt-12">
                                <div className="flex flex-col gap-4 items-center sm:flex-row sm:justify-center">
                                    <Link href="/shop"><Button size="lg" className="rounded-lg">
                                        Shop Now
                                    </Button></Link>
                                    <Link href="/consult"><Button size="lg" variant="outline" className="rounded-lg">
                                        Consult Doctor
                                    </Button></Link>
                                </div>

                                <div
                                    aria-hidden
                                    className="bg-radial from-primary/50 dark:from-primary/25 relative mx-auto mt-32 max-w-3xl to-transparent to-55%">
                                    <div className="mx-auto grid grid-cols-1 gap-4 md:grid-cols-2">
                                        <MedicineCard 
                                            icon={<Package className="size-5" />}
                                            title="Authentic Medicines"
                                            description="100% genuine medicines from verified suppliers"
                                            color="bg-blue-500/10"
                                        />
                                        <MedicineCard 
                                            icon={<Clock className="size-5" />}
                                            title="Fast Delivery"
                                            description="Get medicines delivered within 24 hours"
                                            color="bg-green-500/10"
                                        />
                                        <MedicineCard 
                                            icon={<Shield className="size-5" />}
                                            title="Secure & Safe"
                                            description="Your health data is encrypted and secure"
                                            color="bg-purple-500/10"
                                        />
                                        <MedicineCard 
                                            icon={<Heart className="size-5" />}
                                            title="Expert Support"
                                            description="Talk to licensed pharmacists anytime"
                                            color="bg-red-500/10"
                                        />
                                    </div>
                                    <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] mix-blend-overlay [background-size:16px_16px] mask-[radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] dark:opacity-5"></div>
                                </div>
                            </AnimatedGroup>
                        </div>
                    </div>
                </section>
            
            </main>
        </>
    )
}

interface MedicineCardProps {
    icon: React.ReactNode
    title: string
    description: string
    color: string
}

const MedicineCard = ({ icon, title, description, color }: MedicineCardProps) => {
    return (
        <div className={`border border-white/10 rounded-lg p-6 backdrop-blur-sm ${color} hover:border-white/20 transition-all duration-300`}>
            <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-white/10">
                    {icon}
                </div>
                <div className="text-left">
                    <h3 className="font-semibold text-foreground mb-1">{title}</h3>
                    <p className="text-sm text-muted-foreground">{description}</p>
                </div>
            </div>
        </div>
    )
}
