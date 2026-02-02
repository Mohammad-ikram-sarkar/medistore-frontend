import { Register } from "@/components/Register"
import { Suspense } from "react"
import { Spinner } from "@/components/ui/spinner"
import { userService } from "@/service/user.service"
import { redirect } from "next/navigation"

export default async function Page() {
  const { data } = await userService.getSession()
  console.log('Register page session check:', data)

  // If user is already logged in, redirect to dashboard
  if (data && data !== null) {
    redirect("/dashboard")
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Suspense fallback={<Spinner />}>
          <Register />
        </Suspense>
      </div>
    </div>
  )
}
