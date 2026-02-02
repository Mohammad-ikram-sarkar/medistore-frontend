import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
  // baseURL: "" ,
   baseURL : "http://localhost:8080",
    //  baseURL : "https://medistore-three.vercel.app",
   
  // Ensure cookies are properly handled
  // fetchOptions: {
  //   credentials: 'include',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   // Add mode for CORS handling
  //   mode: 'cors',
  // },
})