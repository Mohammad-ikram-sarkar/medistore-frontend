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
import Link from "next/link"

export function Register(props: React.ComponentProps<typeof Card>) {
  const [googleLoading, setGoogleLoading] = useState(false)
  const router = useRouter()

  const fromSchema = z.object({
    name: z.string().min(1, "this field is required"),
    password: z.string().min(8, "minimum length is 8"),
    email: z.string().email()
  })

  const form = useForm({
    defaultValues: {
      name: '',
      password: '',
      email: ''
    },
    validators: {
      onSubmit: fromSchema
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Creating account...")
      
      try {
        const { data, error } = await authClient.signUp.email(value)
        if (error) {
          toast.error(error.message, { id: toastId })
          return
        }
         
        toast.success("Account created successfully", { id: toastId })
        
        // Use router.push instead of window.location.href for better UX
        router.push("/dashboard")
        
      } catch (error) {
        toast.error("Something went wrong, please try again", { id: toastId })
      }
    },
  })

  const signInWithGoogle = async () => {
    setGoogleLoading(true)
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/api/auth/callback/google",
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
        <CardTitle>Create an account</CardTitle>
      </CardHeader>

      <CardContent>
        <form
          id="submit-b"
          onSubmit={(e) => {
            e.preventDefault()
            form.handleSubmit()
          }}>
          <FieldGroup>
            <form.Field name="name"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                    <Input
                      type="text"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)} />
                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                )
              }}
            />
            <form.Field name="email"
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
                      onChange={(e) => field.handleChange(e.target.value)} />
                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                )
              }}
            />
            <form.Field name="password"
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
                      onChange={(e) => field.handleChange(e.target.value)} />
                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                )
              }}
            />
          </FieldGroup>
        </form>
        
        <div className="space-y-4 mt-4">
          <Button form="submit-b" type="submit" className="w-full">
            Create Account
          </Button>
          
          <div className="text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}