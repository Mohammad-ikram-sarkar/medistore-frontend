'use client'

import { Card, CardContent } from '@/components/ui/card'
import { 
  UserPlus, 
  Calendar, 
  Video, 
  FileText,
  ArrowRight,
  Clock,
  Shield,
  CreditCard
} from 'lucide-react'

const steps = [
  {
    step: 1,
    title: 'Choose Doctor',
    description: 'Select from our network of licensed doctors based on specialty and availability',
    icon: UserPlus,
    color: 'bg-blue-500/10',
    iconColor: 'text-blue-600',
  },
  {
    step: 2,
    title: 'Book Appointment',
    description: 'Schedule your consultation at a convenient time that works for you',
    icon: Calendar,
    color: 'bg-green-500/10',
    iconColor: 'text-green-600',
  },
  {
    step: 3,
    title: 'Consult Online',
    description: 'Connect via video call, voice call, or chat for your medical consultation',
    icon: Video,
    color: 'bg-purple-500/10',
    iconColor: 'text-purple-600',
  },
  {
    step: 4,
    title: 'Get Prescription',
    description: 'Receive digital prescriptions and medical advice directly to your account',
    icon: FileText,
    color: 'bg-orange-500/10',
    iconColor: 'text-orange-600',
  },
]

const benefits = [
  {
    icon: Clock,
    title: 'Save Time',
    description: 'No waiting rooms or travel time required',
  },
  {
    icon: Shield,
    title: 'Secure & Private',
    description: 'HIPAA-compliant platform with end-to-end encryption',
  },
  {
    icon: CreditCard,
    title: 'Affordable',
    description: 'Transparent pricing with no hidden fees',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 bg-muted/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            How Online Consultation Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get medical care in 4 simple steps. It's fast, secure, and convenient.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 mb-16">
          {steps.map((step, index) => (
            <div key={step.step} className="relative">
              <Card className="h-full border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6 text-center">
                  {/* Step Number */}
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-lg mb-4">
                    {step.step}
                  </div>
                  
                  {/* Icon */}
                  <div className={`inline-flex p-3 rounded-lg mb-4 ${step.color}`}>
                    <step.icon className={`h-6 w-6 ${step.iconColor}`} />
                  </div>
                  
                  {/* Content */}
                  <h3 className="font-semibold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
              
              {/* Arrow (hidden on last item) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <ArrowRight className="h-6 w-6 text-muted-foreground" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="bg-white dark:bg-card rounded-2xl p-8 shadow-sm">
          <h3 className="text-2xl font-bold text-center text-foreground mb-8">
            Why Choose Online Consultation?
          </h3>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex p-3 rounded-lg bg-primary/10 mb-4">
                  <benefit.icon className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">
                  {benefit.title}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}