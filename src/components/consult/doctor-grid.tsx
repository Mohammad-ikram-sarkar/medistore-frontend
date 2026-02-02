'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  Star, 
  MapPin, 
  Clock, 
  Video, 
  MessageCircle, 
  Phone,
  Award,
  Calendar
} from 'lucide-react'
import Link from 'next/link'

// Mock doctor data - in real app, this would come from an API
const doctors = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    specialty: 'General Medicine',
    experience: '12 years',
    rating: 4.9,
    reviews: 245,
    location: 'Dhaka, Bangladesh',
    avatar: '/doctors/sarah-johnson.jpg',
    price: 500,
    availability: 'Available Now',
    languages: ['English', 'Bengali'],
    consultationTypes: ['video', 'chat', 'voice'],
    nextSlot: '2:30 PM Today',
    verified: true,
  },
  {
    id: 2,
    name: 'Dr. Michael Chen',
    specialty: 'Cardiology',
    experience: '15 years',
    rating: 4.8,
    reviews: 189,
    location: 'Chittagong, Bangladesh',
    avatar: '/doctors/michael-chen.jpg',
    price: 1000,
    availability: 'Available in 30 min',
    languages: ['English', 'Bengali'],
    consultationTypes: ['video', 'voice'],
    nextSlot: '3:00 PM Today',
    verified: true,
  },
  {
    id: 3,
    name: 'Dr. Emily Rodriguez',
    specialty: 'Dermatology',
    experience: '8 years',
    rating: 4.9,
    reviews: 156,
    location: 'Sylhet, Bangladesh',
    avatar: '/doctors/emily-rodriguez.jpg',
    price: 800,
    availability: 'Available Now',
    languages: ['English', 'Bengali'],
    consultationTypes: ['video', 'chat'],
    nextSlot: 'Available Now',
    verified: true,
  },
  {
    id: 4,
    name: 'Dr. James Wilson',
    specialty: 'Mental Health',
    experience: '10 years',
    rating: 4.7,
    reviews: 203,
    location: 'Rajshahi, Bangladesh',
    avatar: '/doctors/james-wilson.jpg',
    price: 1200,
    availability: 'Available Tomorrow',
    languages: ['English', 'Bengali'],
    consultationTypes: ['video', 'chat', 'voice'],
    nextSlot: '9:00 AM Tomorrow',
    verified: true,
  },
  {
    id: 5,
    name: 'Dr. Lisa Park',
    specialty: 'Pediatrics',
    experience: '14 years',
    rating: 4.9,
    reviews: 298,
    location: 'Khulna, Bangladesh',
    avatar: '/doctors/lisa-park.jpg',
    price: 700,
    availability: 'Available Now',
    languages: ['English', 'Bengali'],
    consultationTypes: ['video', 'chat'],
    nextSlot: 'Available Now',
    verified: true,
  },
  {
    id: 6,
    name: 'Dr. Robert Taylor',
    specialty: 'Orthopedics',
    experience: '18 years',
    rating: 4.8,
    reviews: 167,
    location: 'Barisal, Bangladesh',
    avatar: '/doctors/robert-taylor.jpg',
    price: 1100,
    availability: 'Available in 1 hour',
    languages: ['English', 'Bengali'],
    consultationTypes: ['video', 'voice'],
    nextSlot: '4:30 PM Today',
    verified: true,
  },
]

const consultationIcons = {
  video: Video,
  chat: MessageCircle,
  voice: Phone,
}

export default function DoctorGrid() {
  const [selectedSpecialty, setSelectedSpecialty] = useState('all')
  
  const specialties = ['all', ...new Set(doctors.map(doctor => doctor.specialty))]
  
  const filteredDoctors = selectedSpecialty === 'all' 
    ? doctors 
    : doctors.filter(doctor => doctor.specialty === selectedSpecialty)

  return (
    <section id="doctors" className="py-16 bg-muted/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Meet Our Expert Doctors
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose from our network of licensed healthcare professionals
          </p>
        </div>

        {/* Specialty Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {specialties.map((specialty) => (
            <Button
              key={specialty}
              variant={selectedSpecialty === specialty ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedSpecialty(specialty)}
              className="capitalize"
            >
              {specialty === 'all' ? 'All Specialties' : specialty}
            </Button>
          ))}
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredDoctors.map((doctor) => (
            <Card key={doctor.id} className="group hover:shadow-lg transition-all duration-300 border-0 shadow-sm">
              <CardContent className="p-6">
                {/* Doctor Header */}
                <div className="flex items-start gap-4 mb-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={doctor.avatar} alt={doctor.name} />
                    <AvatarFallback>
                      {doctor.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-foreground">{doctor.name}</h3>
                      {doctor.verified && (
                        <Award className="h-4 w-4 text-blue-600" />
                      )}
                    </div>
                    <p className="text-sm text-primary font-medium mb-1">
                      {doctor.specialty}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {doctor.experience} experience
                    </p>
                  </div>
                </div>

                {/* Rating and Location */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{doctor.rating}</span>
                    <span className="text-xs text-muted-foreground">
                      ({doctor.reviews} reviews)
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    {doctor.location}
                  </div>
                </div>

                {/* Availability */}
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-green-600 font-medium">
                    {doctor.availability}
                  </span>
                </div>

                {/* Next Slot */}
                <div className="flex items-center gap-2 mb-4">
                  <Calendar className="h-4 w-4 text-blue-600" />
                  <span className="text-sm text-foreground">
                    Next: {doctor.nextSlot}
                  </span>
                </div>

                {/* Consultation Types */}
                <div className="flex gap-2 mb-4">
                  {doctor.consultationTypes.map((type) => {
                    const Icon = consultationIcons[type as keyof typeof consultationIcons]
                    return (
                      <div
                        key={type}
                        className="flex items-center gap-1 px-2 py-1 bg-muted rounded-md"
                      >
                        <Icon className="h-3 w-3" />
                        <span className="text-xs capitalize">{type}</span>
                      </div>
                    )
                  })}
                </div>

                {/* Languages */}
                <div className="flex gap-1 mb-4">
                  {doctor.languages.map((language) => (
                    <Badge key={language} variant="secondary" className="text-xs">
                      {language}
                    </Badge>
                  ))}
                </div>

                {/* Price and Book Button */}
                <div className="flex items-center justify-between">
                  <div className="text-lg font-bold text-primary">
                    ৳{doctor.price}
                    <span className="text-sm font-normal text-muted-foreground">
                      /consultation
                    </span>
                  </div>
                  <Button asChild size="sm">
                    <Link href={`/consult/book/${doctor.id}`}>
                      Book Now
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Load More Doctors
          </Button>
        </div>
      </div>
    </section>
  )
}