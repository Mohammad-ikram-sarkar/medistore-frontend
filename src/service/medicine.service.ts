import { env } from "../../env";

 
 const medicineService = {

    
    getMedicines: async () => {
        try {
             const response = await fetch(`${env.BACKEND_URL}/api/medicines`);
        const data = await response.json();
        
        return {data : data.data , error : null};
        }catch (error) {
            return {data : null , error : "get api not working"}
        }
        
       

        
    },
   
   
};
export default medicineService;