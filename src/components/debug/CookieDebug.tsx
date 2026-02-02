'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface CookieInfo {
  name: string
  value: string
  domain?: string
  path?: string
  secure?: boolean
  httpOnly?: boolean
  sameSite?: string
}

export default function CookieDebug() {
  const [cookies, setCookies] = useState<CookieInfo[]>([])
  const [authCookie, setAuthCookie] = useState<string | null>(null)

  useEffect(() => {
    // Get all cookies from document.cookie
    const cookieString = document.cookie
    const cookieArray = cookieString.split(';').map(cookie => {
      const [name, value] = cookie.trim().split('=')
      return { name, value: value || '' }
    }).filter(cookie => cookie.name)

    setCookies(cookieArray)

    // Look specifically for better-auth session token
    const sessionToken = cookieArray.find(cookie => 
      cookie.name.includes('better-auth') || 
      cookie.name.includes('session') ||
      cookie.name.includes('auth')
    )
    
    setAuthCookie(sessionToken ? `${sessionToken.name}=${sessionToken.value}` : null)
  }, [])

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="text-lg">Cookie Debug Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-semibold text-sm mb-2">Auth Cookie Status:</h3>
          <div className="p-2 bg-muted rounded text-sm font-mono">
            {authCookie ? (
              <span className="text-green-600">✅ Found: {authCookie}</span>
            ) : (
              <span className="text-red-600">❌ No auth cookie found</span>
            )}
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-sm mb-2">All Cookies ({cookies.length}):</h3>
          <div className="space-y-1 max-h-40 overflow-y-auto">
            {cookies.length > 0 ? (
              cookies.map((cookie, index) => (
                <div key={index} className="p-2 bg-muted rounded text-xs font-mono">
                  <span className="font-semibold">{cookie.name}:</span> {cookie.value}
                </div>
              ))
            ) : (
              <div className="p-2 bg-muted rounded text-sm text-muted-foreground">
                No cookies found
              </div>
            )}
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-sm mb-2">Environment Info:</h3>
          <div className="p-2 bg-muted rounded text-xs font-mono space-y-1">
            <div><span className="font-semibold">Origin:</span> {typeof window !== 'undefined' ? window.location.origin : 'N/A'}</div>
            <div><span className="font-semibold">Protocol:</span> {typeof window !== 'undefined' ? window.location.protocol : 'N/A'}</div>
            <div><span className="font-semibold">Host:</span> {typeof window !== 'undefined' ? window.location.host : 'N/A'}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}