'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { 
  AlertTriangle, 
  Home, 
  RefreshCw, 
  Mail,
  Phone,
  Server
} from 'lucide-react'

interface GlobalErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Global Application Error:', error)
  }, [error])

  return (
    <html>
      <body>
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center p-6">
          <Card className="w-full max-w-2xl border-0 shadow-lg">
            <CardContent className="p-8 text-center">
              {/* Error Icon */}
              <div className="mb-6">
                <div className="inline-flex p-4 rounded-full bg-red-100">
                  <Server className="h-12 w-12 text-red-600" />
                </div>
              </div>

              {/* Error Message */}
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Server Error
              </h1>
              <p className="text-lg text-gray-600 mb-6">
                We're experiencing technical difficulties. Our team has been notified 
                and is working to resolve this issue as quickly as possible.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Button onClick={reset} size="lg" className="rounded-lg">
                  <RefreshCw className="mr-2 h-5 w-5" />
                  Try Again
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-lg">
                  <Link href="/">
                    <Home className="mr-2 h-5 w-5" />
                    Back to Home
                  </Link>
                </Button>
              </div>

              {/* Help Section */}
              <div className="border-t pt-6">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Need Immediate Help?
                </h3>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="tel:+880-1700-000000"
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <Phone className="h-4 w-4" />
                    +880 1700-000000
                  </a>
                  <a
                    href="mailto:support@medistore.com"
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <Mail className="h-4 w-4" />
                    support@medistore.com
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </body>
    </html>
  )
}