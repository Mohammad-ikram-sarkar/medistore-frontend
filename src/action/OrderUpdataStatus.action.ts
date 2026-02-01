"use server";

import { env } from '../../env';
import { cookies } from "next/headers";

export default async function OrderUpdataStatusAction(id: string, status: string) {
  try {
    const cookieStore = await cookies();
    const response = await fetch(`${env.API_URL}/api/seller/orders/${id}`, {
      method: "PATCH", // or "PUT" depending on your backend
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return { success: true, data: data.data, error: null };
  } catch (err) {
    return { success: false, data: null, error: "API not working or request failed" };
  }
}
