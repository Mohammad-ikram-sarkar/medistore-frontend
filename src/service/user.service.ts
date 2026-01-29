import { cookies } from "next/headers";

export const userService = {
    getSession  : async () => {
        // Logic to get user session
        try {
            const cookiesStore = await cookies();
            console.log(cookiesStore); 
     const res = await fetch(`${process.env.AUTH_URL}/get-session`, {
              
                headers: {
                    "Content-Type": "application/json",
                    Cookie: cookiesStore.toString(),
                },
                cache: "no-store",
            });

            const session  = await res.json();
            if(session === null) {
                return {data :  null , error : "No active session"};
            }
       
            return {data : session.user , error : null};
        }catch (error ) {
            throw new Error("Failed to get user session");
        }

    }
}