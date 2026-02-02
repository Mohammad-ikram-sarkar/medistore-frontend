'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight, Pill, Heart, Baby, Stethoscope, Thermometer, Bandage } from 'lucide-react'
import categoriesService from '@/service/categories.service'
import { Skeleton } from '@/components/ui/skeleton'

// Default categories with icons for fallback
const defaultCategories = [
  {
    id: '1',
    name: 'Pain Relief',
    description: 'Medicines for pain management and relief',
    icon: Pill,
    color: 'bg-blue-500/10 hover:bg-blue-500/20',
    iconColor: 'text-blue-600',
  },
  {
    id: '2',
    name: 'Heart Care',
    description: 'Cardiovascular health medications',
    icon: Heart,
    color: 'bg-red-500/10 hover:bg-red-500/20',
    iconColor: 'text-red-600',
  },
  {
    id: '3',
    name: 'Baby Care',
    description: 'Safe medicines and products for infants',
    icon: Baby,
    color: 'bg-pink-500/10 hover:bg-pink-500/20',
    iconColor: 'text-pink-600',
  },
  {
    id: '4',
    name: 'Diabetes Care',
    description: 'Blood sugar management solutions',
    icon: Stethoscope,
    color: 'bg-green-500/10 hover:bg-green-500/20',
    iconColor: 'text-green-600',
  },
  {
    id: '5',
    name: 'Fever & Cold',
    description: 'Treatment for common cold and fever',
    icon: Thermometer,
    color: 'bg-orange-500/10 hover:bg-orange-500/20',
    iconColor: 'text-orange-600',
  },
  {
    id: '6',
    name: 'First Aid',
    description: 'Emergency care and wound treatment',
    icon: Bandage,
    color: 'bg-purple-500/10 hover:bg-purple-500/20',
    iconColor: 'text-purple-600',
  },
]

interface Category {
  id: string
  name: string
  description?: string
  image?: string
}

export default function FeaturedCategories() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data, error } = await categoriesService.getallcategories()
        
        if (error) {
          setError(error)
          setCategories(defaultCategories)
        } else {
          // Use API data if available, otherwise fallback to default
          setCategories(data && data.length > 0 ? data.slice(0, 6) : defaultCategories)
        }
      } catch (err) {
        setError('Failed to load categories')
        setCategories(defaultCategories)
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  const getCategoryIcon = (index: number) => {
    return defaultCategories[index % defaultCategories.length]
  }

  if (loading) {
    return (
      <section className="py-16 bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <Skeleton className="h-8 w-64 mx-auto mb-4" />
            <Skeleton className="h-4 w-96 mx-auto" />
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <Card key={index} className="group">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Skeleton className="h-12 w-12 rounded-lg" />
                    <div className="flex-1">
                      <Skeleton className="h-5 w-32 mb-2" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-muted/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Featured Categories
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Browse our most popular medicine categories and find what you need quickly
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {categories.map((category, index) => {
            const defaultCategory = getCategoryIcon(index)
            const IconComponent = defaultCategory.icon
            
            return (
              <Link key={category.id} href={`/shop?category=${category.id}`}>
                <Card className="group hover:shadow-lg transition-all duration-300 border-0 shadow-sm hover:scale-[1.02]">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div className={`p-3 rounded-lg transition-colors ${defaultCategory.color}`}>
                        <IconComponent className={`h-6 w-6 ${defaultCategory.iconColor}`} />
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                          {category.name}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                          {category.description || defaultCategory.description}
                        </p>
                        
                        {/* Arrow Icon */}
                        <div className="flex items-center text-primary">
                          <span className="text-sm font-medium">Shop Now</span>
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button asChild size="lg" variant="outline">
            <Link href="/shop">
              View All Categories
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}