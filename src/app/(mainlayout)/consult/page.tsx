import { Metadata } from 'next';
import ConsultHero from '@/components/consult/consult-hero';
import DoctorGrid from '@/components/consult/doctor-grid';
import ConsultationTypes from '@/components/consult/consultation-types';
import HowItWorks from '@/components/consult/how-it-works';
import ConsultStats from '@/components/consult/consult-stats';

export const metadata: Metadata = {
  title: "Consult Doctor Online",
  description: "Get expert medical advice from licensed doctors. Book online consultations, video calls, and chat with healthcare professionals 24/7.",
  keywords: [
    "online doctor consultation",
    "telemedicine",
    "medical advice",
    "doctor appointment",
    "healthcare consultation",
    "medical expert",
    "online prescription",
    "health consultation"
  ],
  openGraph: {
    title: "Consult Doctor Online | MediStore",
    description: "Get expert medical advice from licensed doctors with 24/7 online consultations.",
    images: ["/og-consult.png"],
  },
};

export default function ConsultPage() {
  return (
    <div className="min-h-screen">
      <ConsultHero />
      <ConsultationTypes />
      <HowItWorks />
      <ConsultStats />
      <DoctorGrid />
    </div>
  );
}