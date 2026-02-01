import { cookies } from "next/headers";
import { env } from "../../env";

const adminService = {
    getalluser : async () => {
         try {
               const cookieStore = await cookies();
              const response = await fetch(`${env.API_URL}/api/admin/users`,
                {
                   headers: {
                  "Content-Type": "application/json",
                  Cookie: cookieStore.toString(),
                },
                }
              );
              const data = await response.json();
        
              return { data: data, error: null };
            } catch (error) {
              return { data: null, error: "get api not working" }
            }
        
    },
    getAllOrders : async () => {
         try {
               const cookieStore = await cookies();
              const response = await fetch(`${env.API_URL}/api/admin/users/orders`,
                {
                   headers: {
                  "Content-Type": "application/json",
                  Cookie: cookieStore.toString(),
                },
                }
              );
              const data = await response.json();
        
              return { data: data, error: null };
            } catch (error) {
              return { data: null, error: "get api not working" }
            }
        
    }
    
    

}
export default adminService