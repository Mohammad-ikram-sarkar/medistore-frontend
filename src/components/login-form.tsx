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
import { useRouter, useSearchParams } from "next/navigation"
import { env } from "../../env"

export function LoginForm(props: React.ComponentProps<typeof Card>) {
  const [googleLoading, setGoogleLoading] = useState(false)

  const router = useRouter()
  const searchParams = useSearchParams()

  // ✅ Extract redirect param
  const redirectParam = searchParams.get('redirect')

  // ✅ Safe redirect (prevent open redirect attack)
  const safeRedirect = redirectParam?.startsWith('/') ? redirectParam : '/'

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
        const { error,data } = await authClient.signIn.email(value)
        // console.log(data)

        if (error) {
          toast.error(error.message, { id: toastId })
          return
        }

        toast.success("Signed in successfully", { id: toastId })

        // ✅ Redirect after successful login
 
        // console.log(data.redirect)
        router.push(safeRedirect)
        

      } catch {
        toast.error("Something went wrong, please try again", { id: toastId })
      }
    },
  })

  const signInWithGoogle = async () => {
    setGoogleLoading(true)

    try {
      await authClient.signIn.social({
        provider: "google",

        // ✅ Preserve redirect after OAuth
        callbackURL: `${window.location.origin}/login?redirect=${encodeURIComponent(safeRedirect)}`,
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

        {/* Debug (optional) */}
        <p className="text-xs text-muted-foreground">
          Redirect target: {safeRedirect}
        </p>
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
      </CardContent>
    </Card>
  )
}