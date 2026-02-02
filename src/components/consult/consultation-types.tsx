'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Heart, 
  Brain, 
  Baby, 
  Eye, 
  Bone, 
  Stethoscope,
  Pill,
  Activity,
  ArrowRight
} from 'lucide-react'
import Link from 'next/link'

const specialties = [
  {
    id: 'general',
    name: 'General Medicine',
    description: 'Common health issues, fever, cold, and general checkups',
    icon: Stethoscope,
    price: 'From ৳500',
    color: 'bg-blue-500/10 hover:bg-blue-500/20',
    iconColor: 'text-blue-600',
    popular: true,
  },
  {
    id: 'cardiology',
    name: 'Cardiology',
    description: 'Heart conditions, blood pressure, and cardiovascular health',
    icon: Heart,
    price: 'From ৳1,000',
    color: 'bg-red-500/10 hover:bg-red-500/20',
    iconColor: 'text-red-600',
  },
  {
    id: 'dermatology',
    name: 'Dermatology',
    description: 'Skin conditions, allergies, and cosmetic concerns',
    icon: Activity,
    price: 'From ৳800',
    color: 'bg-green-500/10 hover:bg-green-500/20',
    iconColor: 'text-green-600',
  },
  {
    id: 'pediatrics',
    name: 'Pediatrics',
    description: 'Child healthcare, vaccinations, and development',
    icon: Baby,
    price: 'From ৳700',
    color: 'bg-pink-500/10 hover:bg-pink-500/20',
    iconColor: 'text-pink-600',
  },
  {
    id: 'psychiatry',
    name: 'Mental Health',
    description: 'Anxiety, depression, stress management, and therapy',
    icon: Brain,
    price: 'From ৳1,200',
    color: 'bg-purple-500/10 hover:bg-purple-500/20',
    iconColor: 'text-purple-600',
  },
  {
    id: 'ophthalmology',
    name: 'Eye Care',
    description: 'Vision problems, eye infections, and eye health',
    icon: Eye,
    price: 'From ৳900',
    color: 'bg-orange-500/10 hover:bg-orange-500/20',
    iconColor: 'text-orange-600',
  },
  {
    id: 'orthopedics',
    name: 'Orthopedics',
    description: 'Bone, joint, and muscle problems',
    icon: Bone,
    price: 'From ৳1,100',
    color: 'bg-indigo-500/10 hover:bg-indigo-500/20',
    iconColor: 'text-indigo-600',
  },
  {
    id: 'pharmacy',
    name: 'Pharmacy Consult',
    description: 'Medication guidance and drug interactions',
    icon: Pill,
    price: 'From ৳400',
    color: 'bg-teal-500/10 hover:bg-teal-500/20',
    iconColor: 'text-teal-600',
  },
]

export default function ConsultationTypes() {
  return (
    <section className="py-16 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Choose Your Consultation Type
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Connect with specialists across various medical fields for expert advice and treatment
          </p>
        </div>

        {/* Specialties Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {specialties.map((specialty) => (
            <Card 
              key={specialty.id} 
              className={`group relative transition-all duration-300 hover:shadow-lg hover:scale-[1.02] ${specialty.color} border-0`}
            >
              {specialty.popular && (
                <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded-full">
                  Popular
                </div>
              )}
              
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  {/* Icon */}
                  <div className="p-3 rounded-lg bg-white/50 dark:bg-black/20 mb-4">
                    <specialty.icon className={`h-8 w-8 ${specialty.iconColor}`} />
                  </div>
                  
                  {/* Content */}
                  <h3 className="font-semibold text-foreground mb-2">
                    {specialty.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {specialty.description}
                  </p>
                  
                  {/* Price */}
                  <div className="text-lg font-bold text-primary mb-4">
                    {specialty.price}
                  </div>
                  
                  {/* CTA Button */}
                  <Button 
                    asChild 
                    variant="outline" 
                    size="sm" 
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                  >
                    <Link href={`/consult/book?specialty=${specialty.id}`}>
                      Book Now
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Can't find your specialty? We have more doctors available.
          </p>
          <Button asChild variant="outline" size="lg">
            <Link href="/consult/specialties">
              View All Specialties
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}