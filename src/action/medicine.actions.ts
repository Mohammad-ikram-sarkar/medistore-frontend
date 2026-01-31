// src/actions/medicine.actions.ts
'use server';

import { cookies } from "next/headers";
import { env } from "../../env";
import { createMedicine } from "../../types";


export async function createMedicineAction(medicine: createMedicine) {
  try {
    const cookieStore = await cookies();

    const res = await fetch(`${env.BACKEND_URL}/api/seller/medicines`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify(medicine),
    });

    const data = await res.json();
    return { success: true, data };
  } catch (err) {
    return { 
      success: false, 
      error: { message: "Something Went Wrong", err } 
    };
  }
}