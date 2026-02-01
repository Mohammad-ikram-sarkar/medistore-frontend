"use server";

import customerService, { CreateOrderData } from "@/service/customer.service";

export async function createOrderAction(orderData: CreateOrderData) {
  try {
    const result = await customerService.createOrder(orderData);
    return result;
  } catch (error) {
    return {
      success: false,
      error: { message: "Failed to create order", error }
    };
  }
}