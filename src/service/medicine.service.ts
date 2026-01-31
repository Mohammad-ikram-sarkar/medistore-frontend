import { cookies } from "next/headers";
import { env } from "../../env";
import { createMedicine } from "../../types/medicine.type";


const medicineService = {


  getMedicines: async () => {
    try {
      const response = await fetch(`${env.BACKEND_URL}/api/medicines`);
      const data = await response.json();

      return { data: data.data, error: null };
    } catch (error) {
      return { data: null, error: "get api not working" }
    }




  },
  getMedcinebyId: async (id: string) => {
    try {
      const response = await fetch(`${env.BACKEND_URL}/api/medicines/${id}`)
      const data = await response.json();

      return { data: data.data, error: null };
    } catch (err) {
      return { data: null, error: "get api not working" }
    }
  },
  

}




export default medicineService;