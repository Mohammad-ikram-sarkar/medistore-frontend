"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

export default function AuthSuccessPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (isPending) return;

    if (session?.user) {
      // Check for stored redirect URL
      const storedRedirect = sessionStorage.getItem('auth_redirect');
      
      if (storedRedirect) {
        sessionStorage.removeItem('auth_redirect');
        router.push(storedRedirect);
      } else {
        // Default redirect based on user role
        const userRole = (session.user as any)?.role || 'customer';
        
        switch (userRole.toLowerCase()) {
          case 'admin':
            router.push('/admin-dashboard');
            break;
          case 'seller':
            router.push('/seller-dashboard');
            break;
          case 'customer':
          default:
            router.push('/dashboard');
            break;
        }
      }
    } else {
      // No session, redirect to login
      router.push('/login');
    }
  }, [session, isPending, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardContent className="flex flex-col items-center justify-center p-8">
          <Loader2 className="h-8 w-8 animate-spin mb-4" />
          <h2 className="text-lg font-semibold mb-2">Completing sign in...</h2>
          <p className="text-sm text-gray-600 text-center">
            Please wait while we redirect you to your dashboard.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}