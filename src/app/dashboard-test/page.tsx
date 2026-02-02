'use client'

import { useEffect, useState } from 'react'
import { authClient } from '@/lib/auth-client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function DashboardTest() {
  const [sessionData, setSessionData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const { data: hookSession, isPending, error: hookError } = authClient.useSession()

  useEffect(() => {
    const testSession = async () => {
      try {
        const session = await authClient.getSession()
        setSessionData(session)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    testSession()
  }, [])

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Dashboard Test Page</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>useSession() Hook</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p><strong>isPending:</strong> {isPending ? 'true' : 'false'}</p>
              <p><strong>Error:</strong> {hookError?.message || 'None'}</p>
              <p><strong>Session:</strong></p>
              <pre className="bg-gray-100 p-2 rounded text-xs overflow-auto">
                {JSON.stringify(hookSession, null, 2)}
              </pre>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>getSession() Method</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p><strong>Loading:</strong> {loading ? 'true' : 'false'}</p>
              <p><strong>Error:</strong> {error || 'None'}</p>
              <p><strong>Session:</strong></p>
              <pre className="bg-gray-100 p-2 rounded text-xs overflow-auto">
                {JSON.stringify(sessionData, null, 2)}
              </pre>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Environment Info</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p><strong>Current URL:</strong> {typeof window !== 'undefined' ? window.location.href : 'N/A'}</p>
            <p><strong>Auth Client Base URL:</strong> {(authClient as any).baseURL || 'Not available'}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}