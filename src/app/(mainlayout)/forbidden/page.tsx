'use client'
import React from 'react';
import { AlertCircle, Home, ArrowLeft } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export default function Forbidden() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          <div>
            <CardTitle className="text-4xl font-bold text-slate-900">403</CardTitle>
            <CardDescription className="text-lg mt-2">Access Forbidden</CardDescription>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Permission Denied</AlertTitle>
            <AlertDescription>
              You don't have permission to access this resource. Please contact your administrator if you believe this is an error.
            </AlertDescription>
          </Alert>
          
          <p className="text-sm text-slate-600 text-center">
            This could be due to insufficient permissions, authentication issues, or restricted access to this area.
          </p>
        </CardContent>
        
        <CardFooter className="flex flex-col sm:flex-row gap-3">
          <Button 
            variant="outline" 
            className="w-full sm:w-1/2"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
          <Button 
            className="w-full sm:w-1/2"
            onClick={() => window.location.href = '/'}
          >
            <Home className="w-4 h-4 mr-2" />
            Home Page
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}