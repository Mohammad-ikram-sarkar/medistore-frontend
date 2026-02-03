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
  Phone
} from 'lucide-react'

interface ErrorBoundaryProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function ErrorBoundary({ error, reset }: ErrorBoundaryProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application Error:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 dark:from-red-950/20 dark:via-background dark:to-orange-950/20 flex items-center justify-center p-6">
      <Card className="w-full max-w-2xl border-0 shadow-lg">
        <CardContent className="p-8 text-center">
          {/* Error Icon */}
          <div className="mb-6">
            <div className="inline-flex p-4 rounded-full bg-red-100 dark:bg-red-900/20">
              <AlertTriangle className="h-12 w-12 text-red-600 dark:text-red-400" />
            </div>
          </div>

          {/* Error Message */}
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Something Went Wrong
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            We encountered an unexpected error while processing your request. 
            Our team has been notified and is working to fix this issue.
          </p>

          {/* Error Details (Development only) */}
          {process.env.NODE_ENV === 'development' && (
            <Card className="mb-6 bg-muted/50">
              <CardContent className="p-4">
                <h3 className="font-semibold text-foreground mb-2">Error Details:</h3>
                <p className="text-sm text-muted-foreground font-mono break-all">
                  {error.message}
                </p>
                {error.digest && (
                  <p className="text-xs text-muted-foreground mt-2">
                    Error ID: {error.digest}
                  </p>
                )}
              </CardContent>
            </Card>
          )}

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
            <h3 className="font-semibold text-foreground mb-4">
              Need Immediate Help?
            </h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+880-1700-000000"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Phone className="h-4 w-4" />
                +880 1700-000000
              </a>
              <a
                href="mailto:support@medistore.com"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail className="h-4 w-4" />
                support@medistore.com
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}