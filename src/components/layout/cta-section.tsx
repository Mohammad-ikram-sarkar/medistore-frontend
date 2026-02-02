'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Phone, MessageCircle } from 'lucide-react'

export default function CTASection() {
  return (
    <section className="py-16 bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">
            Need Help Finding the Right Medicine?
          </h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8">
            Our licensed pharmacists are available 24/7 to help you with your healthcare needs. 
            Get expert advice and personalized recommendations.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              asChild 
              size="lg" 
              variant="secondary"
              className="bg-white text-primary hover:bg-white/90"
            >
              <Link href="/consult">
                <MessageCircle className="mr-2 h-5 w-5" />
                Consult Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            
            <Button 
              asChild 
              size="lg" 
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-primary"
            >
              <Link href="tel:+880-1700-000000">
                <Phone className="mr-2 h-5 w-5" />
                Call: +880 1700-000000
              </Link>
            </Button>
          </div>
          
          <div className="mt-8 text-sm opacity-75">
            <p>Available 24/7 • Licensed Doctors • Free Consultation</p>
          </div>
        </div>
      </div>
    </section>
  )
}