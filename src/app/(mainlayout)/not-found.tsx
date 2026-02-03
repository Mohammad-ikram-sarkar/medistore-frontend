import { Metadata } from 'next';
import NotFoundComponent from '@/components/layout/not-found-component';

export const metadata: Metadata = {
  title: '404 - Page Not Found',
  description: 'The page you are looking for could not be found. Return to MediStore to continue shopping for medicines and healthcare products.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return <NotFoundComponent />;
}