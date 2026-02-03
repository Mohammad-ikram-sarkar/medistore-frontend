import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  ArrowLeft, 
  Stethoscope, 
  Users, 
  Calendar,
  Search
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Doctor Not Found - MediStore',
  description: 'The doctor or consultation page you are looking for could not be found. Browse our available doctors for online consultations.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function ConsultNotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-blue-950/20 dark:via-background dark:to-green-950/20 flex items-center justify-center p-6">
      <Card className="w-full max-w-2xl border-0 shadow-lg">
        <CardContent className="p-8 text-center">
          {/* Icon */}
          <div className="mb-6">
            <div className="inline-flex p-4 rounded-full bg-blue-100 dark:bg-blue-900/20">
              <Stethoscope className="h-12 w-12 text-blue-600 dark:text-blue-400" />
            </div>
          </div>

          {/* Message */}
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Doctor Not Found
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            The doctor or consultation page you're looking for is not available. 
            This might be because the doctor is no longer accepting consultations 
            or the link has expired.
          </p>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <Link href="/consult">
              <Card className="group hover:shadow-md transition-all duration-300 bg-blue-50 dark:bg-blue-950/20 border-0">
                <CardContent className="p-4 text-center">
                  <Users className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-foreground">Browse Doctors</p>
                </CardContent>
              </Card>
            </Link>
            
            <Link href="/consult#specialties">
              <Card className="group hover:shadow-md transition-all duration-300 bg-green-50 dark:bg-green-950/20 border-0">
                <CardContent className="p-4 text-center">
                  <Search className="h-6 w-6 text-green-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-foreground">Find Specialist</p>
                </CardContent>
              </Card>
            </Link>
            
            <Link href="/dashboard/appointments">
              <Card className="group hover:shadow-md transition-all duration-300 bg-purple-50 dark:bg-purple-950/20 border-0">
                <CardContent className="p-4 text-center">
                  <Calendar className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-foreground">My Appointments</p>
                </CardContent>
              </Card>
            </Link>
          </div>

          {/* Navigation Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="outline" size="lg" className="rounded-lg">
              <Link href="/consult">
                <ArrowLeft className="mr-2 h-5 w-5" />
                Back to Consultations
              </Link>
            </Button>
            <Button asChild size="lg" className="rounded-lg">
              <Link href="/consult">
                Browse Available Doctors
              </Link>
            </Button>
          </div>

          {/* Help Text */}
          <div className="mt-8 p-4 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground">
              <strong>Need help finding a doctor?</strong><br />
              Call us at <a href="tel:+880-1700-000000" className="text-primary hover:underline">+880 1700-000000</a> 
              {' '}or email <a href="mailto:support@medistore.com" className="text-primary hover:underline">support@medistore.com</a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}