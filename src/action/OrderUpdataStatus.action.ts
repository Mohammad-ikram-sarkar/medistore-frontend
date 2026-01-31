import React from 'react'
import { env } from '../../env';
// import { cookies } from "next/headers";
export default async function OrderUpdataStatusAction(id: string, status: string) {
  try {
    // const cookieStore = await cookies();
      const response = await fetch(`${env.BACKEND_URL}/api/seller/orders/${id}`, {
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
