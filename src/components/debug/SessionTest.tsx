'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { authClient } from '@/lib/auth-client'

interface SessionTestResult {
  method: string
  success: boolean
  data?: any
  error?: string
  timestamp: string
}

export default function SessionTest() {
  const [results, setResults] = useState<SessionTestResult[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // Test useSession hook
  const { data: hookSession, isPending, error: hookError } = authClient.useSession()

  const addResult = (result: Omit<SessionTestResult, 'timestamp'>) => {
    setResults(prev => [...prev, { ...result, timestamp: new Date().toISOString() }])
  }

  const testGetSession = async () => {
    setIsLoading(true)
    try {
      const session = await authClient.getSession()
      addResult({
        method: 'authClient.getSession()',
        success: true,
        data: session
      })
    } catch (error) {
      addResult({
        method: 'authClient.getSession()',
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      })
    }
    setIsLoading(false)
  }

  const testFetchSession = async () => {
    setIsLoading(true)
    try {
      // Get baseURL from auth client configuration
      const baseURL = (authClient as any).baseURL || 'http://localhost:8080'
      
      // Direct fetch to session endpoint
      const response = await fetch(`${baseURL}/api/auth/get-session`, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      
      const data = await response.json()
      addResult({
        method: 'Direct fetch /get-session',
        success: response.ok,
        data: response.ok ? data : undefined,
        error: response.ok ? undefined : `${response.status}: ${response.statusText}`
      })
    } catch (error) {
      addResult({
        method: 'Direct fetch /get-session',
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      })
    }
    setIsLoading(false)
  }

  const clearResults = () => {
    setResults([])
  }

  useEffect(() => {
    // Add hook result when it changes
    if (!isPending) {
      addResult({
        method: 'useSession() hook',
        success: !hookError && !!hookSession,
        data: hookSession,
        error: hookError?.message
      })
    }
  }, [hookSession, isPending, hookError])

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle className="text-lg">Session Test Results</CardTitle>
        <div className="flex gap-2">
          <Button onClick={testGetSession} disabled={isLoading} size="sm">
            Test getSession()
          </Button>
          <Button onClick={testFetchSession} disabled={isLoading} size="sm">
            Test Direct Fetch
          </Button>
          <Button onClick={clearResults} variant="outline" size="sm">
            Clear Results
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {results.length === 0 ? (
            <div className="text-muted-foreground text-sm">No test results yet</div>
          ) : (
            results.map((result, index) => (
              <div key={index} className="border rounded p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm">{result.method}</span>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-1 rounded ${
                      result.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {result.success ? '✅ Success' : '❌ Failed'}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(result.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
                
                {result.error && (
                  <div className="text-sm text-red-600 bg-red-50 p-2 rounded">
                    <strong>Error:</strong> {result.error}
                  </div>
                )}
                
                {result.data && (
                  <div className="text-xs font-mono bg-muted p-2 rounded overflow-x-auto">
                    <pre>{JSON.stringify(result.data, null, 2)}</pre>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}