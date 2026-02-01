'use client'

import { useState, useEffect } from "react"
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
import { useRouter, useSearchParams } from "next/navigation"
import { env } from "../../env"
import { AuthDebug } from "@/components/auth/AuthDebug"

export function LoginForm(props: React.ComponentProps<typeof Card>) {
  const [googleLoading, setGoogleLoading] = useState(false)

  const router = useRouter()
  const searchParams = useSearchParams()

  // ✅ Extract redirect param and error param
  const redirectParam = searchParams.get('redirect')
  const errorParam = searchParams.get('error')

  // ✅ Safe redirect (prevent open redirect attack)
  const safeRedirect = redirectParam?.startsWith('/') ? redirectParam : '/dashboard'

  // ✅ Handle OAuth errors
  useEffect(() => {
    if (errorParam) {
      switch (errorParam) {
        case 'oauth_error':
          toast.error('Google authentication failed. Please try again.')
          break
        case 'missing_code':
          toast.error('Authentication code missing. Please try again.')
          break
        case 'callback_failed':
          toast.error('Authentication callback failed. Please try again.')
          break
        case 'state_mismatch':
          toast.error('Authentication state mismatch. Please try signing in again.')
          break
        case 'invalid_code':
          toast.error('Invalid authentication code. Please try again.')
          break
        default:
          toast.error('Authentication error occurred.')
      }
      
      // Clean up URL
      const url = new URL(window.location.href)
      url.searchParams.delete('error')
      window.history.replaceState({}, '', url.toString())
    }
  }, [errorParam])

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
        console.log(data)

        if (error) {
          toast.error(error.message, { id: toastId })
          return
        }

        toast.success("Signed in successfully", { id: toastId })

        // ✅ Redirect after successful login
        router.push(safeRedirect)
        

      } catch {
        toast.error("Something went wrong, please try again", { id: toastId })
      }
    },
  })

  const signInWithGoogle = async () => {
    setGoogleLoading(true)

    try {
      // Store redirect URL in sessionStorage for after OAuth
      if (safeRedirect !== '/dashboard') {
        sessionStorage.setItem('auth_redirect', safeRedirect)
      }

      // Get the current origin for callback URL
      const currentOrigin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';
      
      await authClient.signIn.social({
        provider: "google",
        // ✅ Use dynamic callback URL based on current origin
        callbackURL: `${currentOrigin}/api/auth/callback/google`,
      })

    } catch (err) {
      console.error("Google login failed:", err)
      toast.error("Google sign-in failed. Please try again.")

    } finally {
      setGoogleLoading(false)
    }
  }

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Sign in to your account</CardTitle>
      </CardHeader>

      <CardContent>
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

        {/* Debug component for troubleshooting auth issues */}
       
      </CardContent>
    </Card>
  )
}