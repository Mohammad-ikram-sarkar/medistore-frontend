'use client'

import { Users, Package, Clock, Award } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const stats = [
  {
    id: 1,
    name: 'Happy Customers',
    value: '50,000+',
    icon: Users,
    description: 'Trusted by families nationwide',
    color: 'bg-blue-500/10',
    iconColor: 'text-blue-600',
  },
  {
    id: 2,
    name: 'Medicines Available',
    value: '10,000+',
    icon: Package,
    description: 'Comprehensive medicine catalog',
    color: 'bg-green-500/10',
    iconColor: 'text-green-600',
  },
  {
    id: 3,
    name: 'Average Delivery',
    value: '2 Hours',
    icon: Clock,
    description: 'Fast and reliable delivery',
    color: 'bg-orange-500/10',
    iconColor: 'text-orange-600',
  },
  {
    id: 4,
    name: 'Years of Trust',
    value: '15+',
    icon: Award,
    description: 'Serving healthcare needs',
    color: 'bg-purple-500/10',
    iconColor: 'text-purple-600',
  },
]

export default function StatsSection() {
  return (
    <section className="py-16 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Why Choose MediStore?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We're committed to providing the best healthcare experience with trusted service and quality products
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