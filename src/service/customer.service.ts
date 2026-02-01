import { cookies } from "next/headers";
import { env } from "../../env";

export interface CreateOrderData {
  phone: string;
  address: string;
  quantity: number;
  medicineId: string;
  authorId: string;
}

const customerService = {
  createOrder: async (orderData: CreateOrderData) => {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${env.BACKEND_URL}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(orderData),
      });

      const data = await res.json();
      
      if (!res.ok) {
        return { 
          success: false, 
          error: { message: data.message || "Failed to create order", status: res.status } 
        };
      }
      
      return { success: true, data };
    } catch (err) {
      return { 
        success: false, 
        error: { message: "Something Went Wrong", err } 
      };
    }
  },
  getOrder : async () => {
    try {
       const cookieStore = await cookies();
      const response = await fetch(`${env.API_URL}/api/orders`,
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
};

export default customerService;