import { Metadata } from 'next';
import DoctorBooking from '@/components/consult/doctor-booking';
import { notFound } from 'next/navigation';

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
    bio: 'Dr. Sarah Johnson is a board-certified family medicine physician with over 12 years of experience. She specializes in preventive care, chronic disease management, and patient education.',
    education: ['MBBS - Dhaka Medical College', 'Residency - Bangabandhu Sheikh Mujib Medical University'],
    certifications: ['Board Certified in Family Medicine', 'ACLS Certified'],
  },
  // Add more doctors as needed
];

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const doctor = doctors.find(d => d.id === parseInt(id));
  
  if (!doctor) {
    return {
      title: 'Doctor Not Found',
    };
  }

  return {
    title: `Book Consultation with ${doctor.name}`,
    description: `Book an online consultation with ${doctor.name}, ${doctor.specialty} specialist with ${doctor.experience} of experience. Available for video, chat, and voice consultations.`,
    openGraph: {
      title: `Book Consultation with ${doctor.name} | MediStore`,
      description: `Book an online consultation with ${doctor.name}, ${doctor.specialty} specialist.`,
    },
  };
}

export default async function BookDoctorPage({ params }: PageProps) {
  const { id } = await params;
  const doctor = doctors.find(d => d.id === parseInt(id));

  if (!doctor) {
    notFound();
  }

  return <DoctorBooking doctor={doctor} />;
}