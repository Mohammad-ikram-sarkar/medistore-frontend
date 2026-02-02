'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { 
  Star, 
  MapPin, 
  Clock, 
  Video, 
  MessageCircle, 
  Phone,
  Award,
  Calendar,
  ArrowLeft,
  CheckCircle,
  GraduationCap,
  Shield
} from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  experience: string;
  rating: number;
  reviews: number;
  location: string;
  avatar: string;
  price: number;
  availability: string;
  languages: string[];
  consultationTypes: string[];
  nextSlot: string;
  verified: boolean;
  bio?: string;
  education?: string[];
  certifications?: string[];
}

interface DoctorBookingProps {
  doctor: Doctor;
}

const consultationIcons = {
  video: Video,
  chat: MessageCircle,
  voice: Phone,
}

const timeSlots = [
  '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM',
  '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM'
]

export default function DoctorBooking({ doctor }: DoctorBookingProps) {
  const [selectedType, setSelectedType] = useState(doctor.consultationTypes[0])
  const [selectedDate, setSelectedDate] = useState('today')
  const [selectedTime, setSelectedTime] = useState('')
  const [symptoms, setSymptoms] = useState('')
  const [isBooking, setIsBooking] = useState(false)

  const handleBooking = async () => {
    if (!selectedTime) {
      toast.error('Please select a time slot')
      return
    }

    if (!symptoms.trim()) {
      toast.error('Please describe your symptoms or reason for consultation')
      return
    }

    setIsBooking(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    toast.success('Consultation booked successfully! You will receive a confirmation email shortly.')
    setIsBooking(false)
  }

  const getConsultationPrice = () => {
    const basePrice = doctor.price
    const multiplier = selectedType === 'video' ? 1 : selectedType === 'voice' ? 0.8 : 0.6
    return Math.round(basePrice * multiplier)
  }

  return (
    <div className="min-h-screen bg-muted/30 py-8">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-6">
          <Button asChild variant="ghost" size="sm">
            <Link href="/consult">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Doctors
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Doctor Information */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardContent className="p-6">
                {/* Doctor Header */}
                <div className="text-center mb-6">
                  <Avatar className="h-24 w-24 mx-auto mb-4">
                    <AvatarImage src={doctor.avatar} alt={doctor.name} />
                    <AvatarFallback className="text-lg">
                      {doctor.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <h1 className="text-xl font-bold text-foreground">{doctor.name}</h1>
                    {doctor.verified && (
                      <Award className="h-5 w-5 text-blue-600" />
                    )}
                  </div>
                  
                  <p className="text-primary font-medium mb-1">{doctor.specialty}</p>
                  <p className="text-sm text-muted-foreground">{doctor.experience} experience</p>
                </div>

                {/* Rating and Reviews */}
                <div className="flex items-center justify-center gap-2 mb-6">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{doctor.rating}</span>
                  </div>
                  <span className="text-muted-foreground">({doctor.reviews} reviews)</span>
                </div>

                {/* Location */}
                <div className="flex items-center justify-center gap-2 mb-6">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{doctor.location}</span>
                </div>

                {/* Bio */}
                {doctor.bio && (
                  <div className="mb-6">
                    <h3 className="font-semibold text-foreground mb-2">About</h3>
                    <p className="text-sm text-muted-foreground">{doctor.bio}</p>
                  </div>
                )}

                {/* Education */}
                {doctor.education && (
                  <div className="mb-6">
                    <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      <GraduationCap className="h-4 w-4" />
                      Education
                    </h3>
                    <ul className="space-y-1">
                      {doctor.education.map((edu, index) => (
                        <li key={index} className="text-sm text-muted-foreground">
                          {edu}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Certifications */}
                {doctor.certifications && (
                  <div className="mb-6">
                    <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      Certifications
                    </h3>
                    <ul className="space-y-1">
                      {doctor.certifications.map((cert, index) => (
                        <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                          <CheckCircle className="h-3 w-3 text-green-600" />
                          {cert}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Languages */}
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Languages</h3>
                  <div className="flex flex-wrap gap-2">
                    {doctor.languages.map((language) => (
                      <Badge key={language} variant="secondary">
                        {language}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Book Consultation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Consultation Type */}
                <div>
                  <Label className="text-base font-semibold">Consultation Type</Label>
                  <div className="grid grid-cols-1 gap-3 mt-3 sm:grid-cols-3">
                    {doctor.consultationTypes.map((type) => {
                      const Icon = consultationIcons[type as keyof typeof consultationIcons]
                      return (
                        <Card
                          key={type}
                          className={`cursor-pointer transition-all ${
                            selectedType === type
                              ? 'ring-2 ring-primary bg-primary/5'
                              : 'hover:bg-muted/50'
                          }`}
                          onClick={() => setSelectedType(type)}
                        >
                          <CardContent className="p-4 text-center">
                            <Icon className="h-6 w-6 mx-auto mb-2" />
                            <p className="font-medium capitalize">{type}</p>
                            <p className="text-sm text-muted-foreground">
                              ৳{getConsultationPrice()}
                            </p>
                          </CardContent>
                        </Card>
                      )
                    })}
                  </div>
                </div>

                {/* Date Selection */}
                <div>
                  <Label className="text-base font-semibold">Select Date</Label>
                  <div className="grid grid-cols-2 gap-3 mt-3">
                    <Card
                      className={`cursor-pointer transition-all ${
                        selectedDate === 'today'
                          ? 'ring-2 ring-primary bg-primary/5'
                          : 'hover:bg-muted/50'
                      }`}
                      onClick={() => setSelectedDate('today')}
                    >
                      <CardContent className="p-4 text-center">
                        <Calendar className="h-5 w-5 mx-auto mb-2" />
                        <p className="font-medium">Today</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date().toLocaleDateString()}
                        </p>
                      </CardContent>
                    </Card>
                    <Card
                      className={`cursor-pointer transition-all ${
                        selectedDate === 'tomorrow'
                          ? 'ring-2 ring-primary bg-primary/5'
                          : 'hover:bg-muted/50'
                      }`}
                      onClick={() => setSelectedDate('tomorrow')}
                    >
                      <CardContent className="p-4 text-center">
                        <Calendar className="h-5 w-5 mx-auto mb-2" />
                        <p className="font-medium">Tomorrow</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(Date.now() + 86400000).toLocaleDateString()}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Time Slots */}
                <div>
                  <Label className="text-base font-semibold">Available Time Slots</Label>
                  <div className="grid grid-cols-3 gap-2 mt-3 sm:grid-cols-4 lg:grid-cols-6">
                    {timeSlots.map((time) => (
                      <Button
                        key={time}
                        variant={selectedTime === time ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedTime(time)}
                        className="text-xs"
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Symptoms/Reason */}
                <div>
                  <Label htmlFor="symptoms" className="text-base font-semibold">
                    Describe your symptoms or reason for consultation
                  </Label>
                  <Textarea
                    id="symptoms"
                    placeholder="Please describe your symptoms, concerns, or reason for this consultation..."
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                    className="mt-2"
                    rows={4}
                  />
                </div>

                {/* Booking Summary */}
                <Card className="bg-muted/50">
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-3">Booking Summary</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Doctor:</span>
                        <span className="font-medium">{doctor.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Consultation Type:</span>
                        <span className="font-medium capitalize">{selectedType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Date:</span>
                        <span className="font-medium">
                          {selectedDate === 'today' ? 'Today' : 'Tomorrow'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Time:</span>
                        <span className="font-medium">{selectedTime || 'Not selected'}</span>
                      </div>
                      <div className="flex justify-between border-t pt-2 mt-2">
                        <span className="font-semibold">Total:</span>
                        <span className="font-bold text-primary">
                          ৳{getConsultationPrice()}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Book Button */}
                <Button
                  onClick={handleBooking}
                  disabled={isBooking || !selectedTime || !symptoms.trim()}
                  size="lg"
                  className="w-full"
                >
                  {isBooking ? 'Booking...' : `Book Consultation - ৳${getConsultationPrice()}`}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}