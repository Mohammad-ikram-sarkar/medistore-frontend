// src/actions/medicine.actions.ts
'use server';

import { cookies } from "next/headers";
import { env } from "../../env";
import { createMedicine } from "../../types";
import { revalidatePath } from 'next/cache';

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
    
    if (data.success) {
      revalidatePath('/seller-dashboard/my-medicine');
      return { success: true, data: data.data };
    } else {
      return { success: false, error: data.message || "Failed to create medicine" };
    }
  } catch (err) {
    return { 
      success: false, 
      error: { message: "Something Went Wrong", err } 
    };
  }
}

export async function updateMedicineAction(id: string, medicine: Partial<createMedicine>) {
  try {
    const cookieStore = await cookies();

    const res = await fetch(`${env.BACKEND_URL}/api/seller/medicines/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify(medicine),
    });

    const data = await res.json();
    
    if (data.success) {
      revalidatePath('/seller-dashboard/my-medicine');
      return { success: true, data: data.data };
    } else {
      return { success: false, error: data.message || "Failed to update medicine" };
    }
  } catch (err) {
    return { 
      success: false, 
      error: { message: "Something Went Wrong", err } 
    };
  }
}

export async function deleteMedicineAction(id: string) {
  try {
    const cookieStore = await cookies();

    const res = await fetch(`${env.BACKEND_URL}/api/seller/medicines/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
    });

    const data = await res.json();
    
    if (data.success) {
      revalidatePath('/seller-dashboard/my-medicine');
      return { success: true, data: data.data };
    } else {
      return { success: false, error: data.message || "Failed to delete medicine" };
    }
  } catch (err) {
    return { 
      success: false, 
      error: { message: "Something Went Wrong", err } 
    };
  }
}