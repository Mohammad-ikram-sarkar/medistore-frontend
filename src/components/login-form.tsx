'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { authClient } from "@/lib/auth-client"
import { useForm } from '@tanstack/react-form'
import z from "zod"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { cartUtils } from "@/lib/cart-utils"
import { Role } from "@/constants/Role"
import CookieDebug from "@/components/debug/CookieDebug"
import SessionTest from "@/components/debug/SessionTest"

export function LoginForm(props: React.ComponentProps<typeof Card>) {
  const [googleLoading, setGoogleLoading] = useState(false)
  const [showDebug, setShowDebug] = useState(false)

  const router = useRouter()

  const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, "minimum length is 8"),
  })

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    validators: {
      onSubmit: formSchema
    },
    onSubmit: async ({ value }) => {
      
      const toastId = toast.loading("Signing in...")

      try {
        const { error, data } = await authClient.signIn.email(value)
        console.log('Login response:', data)

        if (error) {
          console.error('Login error:', error)
          toast.error(error.message, { id: toastId })
          return
        }

        // Clear cart if user is not a customer (admin/seller shouldn't have cart items)
        const userRole = (data?.user as any)?.role;
        if (userRole && userRole !== Role.CUSTOMER) {
          cartUtils.clearCart();
        }

        toast.success("Signed in successfully", { id: toastId })
        
        // Redirect to customer dashboard - other roles will be handled by their specific routes
        window.location.href = "/dashboard";

      } catch (err) {
        console.error('Login catch error:', err)
        toast.error("Something went wrong, please try again", { id: toastId })
      }
    },
  })

  const { data: session, isPending, error } = authClient.useSession()
  
  // Enhanced session debugging
  console.log('Login form session debug:', {
    session,
    isPending,
    error,
    hasUser: !!session?.user,
    userRole: session?.user ? (session.user as any).role : null,
    timestamp: new Date().toISOString()
  })

  const signInWithGoogle = async () => {
    setGoogleLoading(true)

    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/api/auth/callback/google",
      })

      // Google OAuth will redirect through the callback, so no need to handle redirect here

    } catch (err) {
      console.error("Google login failed:", err)
      toast.error("Google sign-in failed. Please try again.")

    } finally {
      setGoogleLoading(false)
    }
  }

  // Quick login functions for testing
  const quickLogin = (role: 'admin' | 'customer' | 'seller') => {
    const credentials = {
      admin: { email: 'admin@gmail.com', password: 'password1234' },
      customer: { email: 'customer@gmail.com', password: 'password1234' },
      seller: { email: 'seller@gmail.com', password: 'password1234' }
    }

    form.setFieldValue('email', credentials[role].email)
    form.setFieldValue('password', credentials[role].password)
  }

  return (
    <div className="space-y-6">
      <Card {...props}>
        <CardHeader>
          <CardTitle>Sign in to your account</CardTitle>
        </CardHeader>

        <CardContent>
          {/* Session Status Display */}
          <div className="mb-4 p-3 bg-muted rounded-lg">
            <div className="text-sm">
              <strong>Session Status:</strong> {isPending ? '🔄 Loading...' : session?.user ? '✅ Logged In' : '❌ Not Logged In'}
            </div>
            {session?.user && (
              <div className="text-xs text-muted-foreground mt-1">
                User: {session.user.name} ({(session.user as any)?.role || 'No role'})
              </div>
            )}
            {error && (
              <div className="text-xs text-red-600 mt-1">
                Error: {error.message}
              </div>
            )}
          </div>
          
          {/* Quick Login Buttons */}
          <div className="mb-6">
            <p className="text-sm text-gray-600 mb-3">Quick Login (for testing):</p>
            <div className="grid grid-cols-3 gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => quickLogin('admin')}
                className="text-xs"
              >
                Admin
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => quickLogin('customer')}
                className="text-xs"
              >
                Customer
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => quickLogin('seller')}
                className="text-xs"
              >
                Seller
              </Button>
            </div>
          </div>

          <form
            id="login-form"
            onSubmit={(e) => {
              e.preventDefault()
              form.handleSubmit()
            }}
          >
            <FieldGroup>

              <form.Field
                name="email"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid

                  return (
                    <Field>
                      <FieldLabel htmlFor={field.name}>Email</FieldLabel>

                      <Input
                        type="email"
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />

                      {isInvalid && <FieldError errors={field.state.meta.errors} />}
                    </Field>
                  )
                }}
              />

              <form.Field
                name="password"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid

                  return (
                    <Field>
                      <FieldLabel htmlFor={field.name}>Password</FieldLabel>

                      <Input
                        type="password"
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />

                      {isInvalid && <FieldError errors={field.state.meta.errors} />}
                    </Field>
                  )
                }}
              />

            </FieldGroup>
          </form>

          <div className="space-y-4 mt-4">

            <Button form="login-form" type="submit" className="w-full">
              Sign In
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>

              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={signInWithGoogle}
              disabled={googleLoading}
            >
              {googleLoading ? "Loading..." : "Sign in with Google"}
            </Button>

          </div>
          
          {/* Debug Toggle */}
          <div className="mt-6 pt-4 border-t">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setShowDebug(!showDebug)}
              className="w-full text-xs"
            >
              {showDebug ? 'Hide' : 'Show'} Debug Info
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Debug Components */}
      {showDebug && (
        <div className="space-y-4">
          <CookieDebug />
          <SessionTest />
        </div>
      )}
    </div>
  )
}