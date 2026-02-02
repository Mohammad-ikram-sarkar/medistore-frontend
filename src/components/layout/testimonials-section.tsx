'use client'

import { Star, Quote } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const testimonials = [
  {
    id: 1,
    name: 'Fatima Rahman',
    role: 'Regular Customer',
    avatar: '/avatars/fatima.jpg',
    rating: 5,
    content: 'MediStore has been a lifesaver for our family. The medicines are always authentic, and the delivery is incredibly fast. I especially love their customer service - they\'re always ready to help.',
  },
  {
    id: 2,
    name: 'Dr. Karim Ahmed',
    role: 'Family Physician',
    avatar: '/avatars/karim.jpg',
    rating: 5,
    content: 'As a doctor, I recommend MediStore to my patients. Their quality assurance is excellent, and they stock all the essential medications. The online consultation feature is also very helpful.',
  },
  {
    id: 3,
    name: 'Rashida Begum',
    role: 'Mother of Two',
    avatar: '/avatars/rashida.jpg',
    rating: 5,
    content: 'With two young kids, I need medicines quickly when they fall sick. MediStore\'s 2-hour delivery has saved us multiple trips to the pharmacy. Highly recommended for busy parents!',
  },
]

export default function TestimonialsSection() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it - hear from thousands of satisfied customers
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                {/* Quote Icon */}
                <div className="mb-4">
                  <Quote className="h-8 w-8 text-primary/20" />
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, index) => (
                    <Star key={index} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback>
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-foreground">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </div>
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