import { cookies, headers } from "next/headers";
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
  orderMedcinebyId : async () => {
     try {
       const cookieStore = await cookies();
      const response = await fetch(`${env.API_URL}/api/seller/orders`,
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
  updataStatus: async (id: string, status: string) => {
  try {
    const response = await fetch(`${env.API_URL}/api/seller/orders/${id}`, {
      method: "PATCH", // or "PUT" depending on your backend
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return { data: data.data, error: null };
  } catch (err) {
    return { data: null, error: "API not working or request failed" };
  }
}

  

}




export default medicineService;