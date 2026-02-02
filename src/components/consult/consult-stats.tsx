'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Users, Clock, Star, Award } from 'lucide-react'

const stats = [
  {
    id: 1,
    name: 'Consultations Completed',
    value: '25,000+',
    icon: Users,
    description: 'Successful online consultations',
    color: 'bg-blue-500/10',
    iconColor: 'text-blue-600',
  },
  {
    id: 2,
    name: 'Average Response Time',
    value: '< 5 min',
    icon: Clock,
    description: 'Quick connection with doctors',
    color: 'bg-green-500/10',
    iconColor: 'text-green-600',
  },
  {
    id: 3,
    name: 'Patient Satisfaction',
    value: '4.9/5',
    icon: Star,
    description: 'Based on patient reviews',
    color: 'bg-yellow-500/10',
    iconColor: 'text-yellow-600',
  },
  {
    id: 4,
    name: 'Licensed Doctors',
    value: '500+',
    icon: Award,
    description: 'Verified healthcare professionals',
    color: 'bg-purple-500/10',
    iconColor: 'text-purple-600',
  },
]

export default function ConsultStats() {
  return (
    <section className="py-16 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Trusted by Thousands
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of patients who trust our platform for their healthcare needs
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.id} className="text-center border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className={`inline-flex p-3 rounded-lg mb-4 ${stat.color}`}>
                  <stat.icon className={`h-6 w-6 ${stat.iconColor}`} />
                </div>
                <div className="text-3xl font-bold text-foreground mb-2">
                  {stat.value}
                </div>
                <div className="text-lg font-semibold text-foreground mb-1">
                  {stat.name}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.description}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}