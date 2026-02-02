'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, XCircle, AlertCircle, Loader2 } from 'lucide-react';

interface TestResult {
  endpoint: string;
  status: 'success' | 'error' | 'loading';
  statusCode?: number;
  message: string;
  data?: any;
  error?: string;
}

export function ProductionApiTest() {
  const [results, setResults] = useState<TestResult[]>([]);
  const [testing, setTesting] = useState(false);

  const endpoints = [
    { name: 'Base URL', url: 'https://medistore-three.vercel.app' },
    { name: 'Medicines API', url: 'https://medistore-three.vercel.app/api/medicines' },
    { name: 'Auth Session', url: 'https://medistore-three.vercel.app/api/auth/get-session' },
    { name: 'Categories API', url: 'https://medistore-three.vercel.app/api/categories' },
    { name: 'Health Check', url: 'https://medistore-three.vercel.app/api/health' },
  ];

  const testEndpoint = async (endpoint: { name: string; url: string }): Promise<TestResult> => {
    try {
      const response = await fetch(endpoint.url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      const statusCode = response.status;
      let data = null;
      let message = '';

      try {
        data = await response.json();
        message = `Success: ${statusCode}`;
      } catch {
        // If not JSON, try to get text
        try {
          const text = await response.text();
          message = `Response: ${statusCode} - ${text.substring(0, 100)}`;
        } catch {
          message = `Response: ${statusCode} - No content`;
        }
      }

      return {
        endpoint: endpoint.name,
        status: response.ok ? 'success' : 'error',
        statusCode,
        message,
        data,
      };
    } catch (error) {
      return {
        endpoint: endpoint.name,
        status: 'error',
        message: `Network Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  };

  const runAllTests = async () => {
    setTesting(true);
    setResults([]);

    for (const endpoint of endpoints) {
      // Add loading state
      setResults(prev => [...prev, {
        endpoint: endpoint.name,
        status: 'loading',
        message: 'Testing...',
      }]);

      const result = await testEndpoint(endpoint);
      
      // Update with actual result
      setResults(prev => prev.map(r => 
        r.endpoint === endpoint.name ? result : r
      ));

      // Small delay between requests
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    setTesting(false);
  };

  const getStatusIcon = (status: TestResult['status']) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-600" />;
      case 'loading':
        return <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />;
      default:
        return <AlertCircle className="w-5 h-5 text-yellow-600" />;
    }
  };

  const getStatusBadge = (status: TestResult['status'], statusCode?: number) => {
    if (status === 'loading') {
      return <Badge variant="secondary">Testing...</Badge>;
    }
    if (status === 'success') {
      return <Badge variant="default">✓ {statusCode}</Badge>;
    }
    return <Badge variant="destructive">✗ {statusCode || 'Error'}</Badge>;
  };

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertCircle className="w-6 h-6" />
          Production API Diagnostics
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex gap-4">
          <Button onClick={runAllTests} disabled={testing}>
            {testing ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Testing APIs...
              </>
            ) : (
              'Test All Endpoints'
            )}
          </Button>
        </div>

        {results.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Test Results:</h3>
            
            {results.map((result, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(result.status)}
                    <span className="font-medium">{result.endpoint}</span>
                  </div>
                  {getStatusBadge(result.status, result.statusCode)}
                </div>
                
                <p className="text-sm text-gray-600 mb-2">{result.message}</p>
                
                {result.error && (
                  <Alert className="mb-2">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Error:</strong> {result.error}
                    </AlertDescription>
                  </Alert>
                )}
                
                {result.data && (
                  <details className="mt-2">
                    <summary className="cursor-pointer text-sm font-medium text-blue-600">
                      View Response Data
                    </summary>
                    <pre className="mt-2 p-2 bg-gray-100 rounded text-xs overflow-auto">
                      {JSON.stringify(result.data, null, 2)}
                    </pre>
                  </details>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-semibold text-blue-900 mb-2">Common Issues & Solutions:</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li><strong>404 Not Found:</strong> Backend not deployed or wrong URL</li>
            <li><strong>CORS Error:</strong> Backend doesn't allow your domain</li>
            <li><strong>500 Server Error:</strong> Backend code issue or database problem</li>
            <li><strong>Network Error:</strong> DNS issue or server down</li>
            <li><strong>403 Forbidden:</strong> Authentication or authorization issue</li>
          </ul>
        </div>

        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold mb-2">Environment Info:</h4>
          <div className="text-sm space-y-1">
            <p><strong>Current URL:</strong> {typeof window !== 'undefined' ? window.location.origin : 'N/A'}</p>
            <p><strong>Auth URL:</strong> {process.env.NEXT_PUBLIC_AUTH_URL}</p>
            <p><strong>User Agent:</strong> {typeof navigator !== 'undefined' ? navigator.userAgent.substring(0, 50) + '...' : 'N/A'}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}