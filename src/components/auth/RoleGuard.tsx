"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Role } from "@/constants/Role";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShieldAlert, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles: string[];
  fallbackPath?: string;
}

export const RoleGuard: React.FC<RoleGuardProps> = ({ 
  children, 
  allowedRoles, 
  fallbackPath = "/" 
}) => {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  useEffect(() => {
    if (isPending) return;

    if (!session?.user) {
      // Not logged in - redirect to login
      router.push("/login");
      return;
    }

    // Check if user has required role
    // @ts-ignore - role property might not be in the type definition but exists in runtime
    const userRole = session.user.role || "customer"; // default to customer if no role
    const hasPermission = allowedRoles.includes(userRole);
    
    setIsAuthorized(hasPermission);
  }, [session, isPending, allowedRoles, router]);

  // Loading state
  if (isPending || isAuthorized === null) {
    return (
      <div className="container mx-auto p-4 max-w-2xl">
        <Card className="mt-8 text-center">
          <CardContent className="pt-8 pb-8">
            <div className="w-16 h-16 mx-auto mb-4 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
            <h1 className="text-xl font-semibold mb-2">Checking permissions...</h1>
            <p className="text-gray-600">
              Please wait while we verify your access.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Not logged in (handled by useEffect redirect)
  if (!session?.user) {
    return (
      <div className="container mx-auto p-4 max-w-2xl">
        <Card className="mt-8 text-center">
          <CardContent className="pt-8 pb-8">
            <ShieldAlert className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-xl font-semibold mb-2">Authentication Required</h1>
            <p className="text-gray-600 mb-6">
              Please log in to access this page.
            </p>
            <Link href="/login">
              <Button>
                Go to Login
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Not authorized
  if (!isAuthorized) {
    return (
      <div className="container mx-auto p-4 max-w-2xl">
        <Card className="mt-8 text-center">
          <CardContent className="pt-8 pb-8">
            <ShieldAlert className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-xl font-semibold mb-2">Access Denied</h1>
            <p className="text-gray-600 mb-4">
              You don't have permission to access this page.
            </p>
            <p className="text-sm text-gray-500 mb-6">
              Required role: {allowedRoles.join(" or ")} | Your role: {(session.user as any).role || "customer"}
            </p>
            <div className="flex gap-4 justify-center">
              <Link href={fallbackPath}>
                <Button variant="outline">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Go Back
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button>
                  Go to Dashboard
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Authorized - render children
  return <>{children}</>;
};