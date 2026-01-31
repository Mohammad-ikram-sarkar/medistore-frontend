"use client";
import OrderUpdataStatusAction from "@/action/OrderUpdataStatus.action";
import { authClient } from "@/lib/auth-client";
import React, { useState } from "react";
// adjust path

interface Medicine {
  name: string;
  image: string;
  brand: string;
  price: number;
}

interface Order {
  id: string;
  authorId: string;
  email: string;
  phone: string;
  address: string;
  quantity: number;
  medicineId: string;
  status: "PENDING" | "CONFIRMED" | "PROCESSING" | "CANCELLED";
  createdAt: string;
  updatedAt: string;
  medicine: Medicine;
}

interface OrderDataProps {
  data: Order[];
}

const statusOptions = ["PENDING", "CONFIRMED", "PROCESSING", "CANCELLED"];

const OrderStatusChange: React.FC<OrderDataProps> = ({ data }) => {
  const [orders, setOrders] = useState<Order[]>(data);
  const [loadingId, setLoadingId] = useState<string | null>(null);
const user = authClient.useSession();
  console.log(data)

  const handleStatusChange = async (orderId: string, newStatus: Order["status"]) => {
  setLoadingId(orderId);
  const result = await OrderUpdataStatusAction(orderId, newStatus);

  if (result.error) {
    alert("Failed to update status: " + result.error);
  } else {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  }

  setLoadingId(null);
};

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <div
          key={order.id}
          className="border p-4 rounded-md flex items-center justify-between"
        >
          <div className="flex items-center space-x-4">
            <img
              src={order.medicine.image}
              alt={order.medicine.name}
              className="w-16 h-16 object-cover rounded"
            />
            <div>
              <h3 className="font-semibold">{order.medicine.name}</h3>
              <p>Brand: {order.medicine.brand}</p>
              <p>Quantity: {order.quantity}</p>
              <p>Email: {order.email}</p>
            </div>
          </div>

          <div>
            <select
              value={order.status}onChange={(e) =>
  handleStatusChange(order.id, e.target.value as Order["status"])
}
              
              disabled={loadingId === order.id}
              className="border rounded px-2 py-1"
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderStatusChange;
