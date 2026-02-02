'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { authClient } from '@/lib/auth-client';

export function ApiDebug() {
  const [sessionData, setSessionData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const testSession = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Test client-side session
      const { data: clientSession } = authClient.useSession();
      console.log('Client session:', clientSession);
      
      // Test API call
      const response = await fetch('/api/test-session');
      const serverSession = await response.json();
      console.log('Server session:', serverSession);
      
      setSessionData({
        client: clientSession,
        server: serverSession,
        timestamp: new Date().toISOString()
      });
      
    } catch (err) {
      console.error('Session test error:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const testApiCall = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/medicines');
      const data = await response.json();
      console.log('API test result:', data);
      
      setSessionData({
        apiTest: data,
        timestamp: new Date().toISOString()
      });
      
    } catch (err) {
      console.error('API test error:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>API & Authentication Debug</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Button onClick={testSession} disabled={loading}>
            Test Session
          </Button>
          <Button onClick={testApiCall} disabled={loading}>
            Test API Call
          </Button>
        </div>
        
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-600">Error: {error}</p>}
        
        {sessionData && (
          <div className="bg-gray-100 p-4 rounded-md">
            <h3 className="font-semibold mb-2">Debug Results:</h3>
            <pre className="text-sm overflow-auto">
              {JSON.stringify(sessionData, null, 2)}
            </pre>
          </div>
        )}
        
        <div className="text-sm text-gray-600">
          <h4 className="font-semibold">Environment Info:</h4>
          <p>Auth URL: {process.env.NEXT_PUBLIC_AUTH_URL}</p>
          <p>Current URL: {typeof window !== 'undefined' ? window.location.origin : 'N/A'}</p>
        </div>
      </CardContent>
    </Card>
  );
}