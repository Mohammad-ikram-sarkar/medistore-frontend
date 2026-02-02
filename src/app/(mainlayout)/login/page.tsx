import { LoginForm } from "@/components/login-form"
import { Suspense } from "react"
import { Spinner } from "@/components/ui/spinner"
import { userService } from "@/service/user.service"
export default async function Page() {
  const {data} = await userService.getSession()
  console.log(data)

   

  if(data === true) {
    return window.location.href = "/dashboard";
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      
   
      <div className="w-full max-w-sm">
         <Suspense fallback={<Spinner />}>
             <LoginForm /> 
         </Suspense>
        
      </div>
    </div>
  )
}
