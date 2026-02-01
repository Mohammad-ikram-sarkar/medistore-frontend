"use client";
import OrderUpdataStatusAction from "@/action/OrderUpdataStatus.action";
import { authClient } from "@/lib/auth-client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2, Package, User, Phone, Mail, MapPin } from "lucide-react";

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
  status: "PENDING" | "PROCESSING" | "COMPLETED" | "CANCELLED";
  createdAt: string;
  updatedAt: string;
  medicine: Medicine;
}

interface OrderDataProps {
  data: Order[];
}

const statusOptions = [
  { value: "PENDING", label: "Pending", color: "bg-yellow-100 text-yellow-800" },
  { value: "PROCESSING", label: "Processing", color: "bg-blue-100 text-blue-800" },
  { value: "COMPLETED", label: "Completed", color: "bg-green-100 text-green-800" },
  { value: "CANCELLED", label: "Cancelled", color: "bg-red-100 text-red-800" }
];

const OrderStatusChange: React.FC<OrderDataProps> = ({ data }) => {
  const [orders, setOrders] = useState<Order[]>(data);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const user = authClient.useSession();

  const getStatusColor = (status: string) => {
    const statusOption = statusOptions.find(option => option.value === status);
    return statusOption?.color || "bg-gray-100 text-gray-800";
  };

  const handleStatusChange = async (orderId: string, newStatus: Order["status"]) => {
    setLoadingId(orderId);
    
    try {
      const result = await OrderUpdataStatusAction(orderId, newStatus);

      if (!result.success || result.error) {
        toast.error("Failed to update status", {
          description: result.error || "Unknown error occurred"
        });
      } else {
        setOrders((prev) =>
          prev.map((order) =>
            order.id === orderId ? { ...order, status: newStatus } : order
          )
        );
        toast.success("Status updated successfully", {
          description: `Order status changed to ${newStatus}`
        });
      }
    } catch (error) {
      toast.error("Failed to update status", {
        description: "Network error occurred"
      });
    }

    setLoadingId(null);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!orders || orders.length === 0) {
    return (
      <div className="container mx-auto p-6">
        <Card className="text-center py-12">
          <CardContent>
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Orders Found</h3>
            <p className="text-gray-500">There are no orders to manage at the moment.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Order Management</h1>
        <Badge variant="outline" className="text-lg px-4 py-2">
          {orders.length} {orders.length === 1 ? 'Order' : 'Orders'}
        </Badge>
      </div>

      <div className="grid gap-6">
        {orders.map((order) => (
          <Card key={order.id} className="overflow-hidden shadow-lg">
            <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 border-b">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Package className="w-6 h-6 text-gray-600" />
                  <div>
                    <CardTitle className="text-lg font-semibold">
                      Order #{order.id.slice(-8)}
                    </CardTitle>
                    <p className="text-sm text-gray-600">
                      Placed on {formatDate(order.createdAt)}
                    </p>
                  </div>
                </div>
                
                <Badge className={`px-3 py-1 font-medium ${getStatusColor(order.status)}`}>
                  {order.status}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Medicine Information */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                    <Package className="w-5 h-5" />
                    Medicine Details
                  </h3>
                  
                  <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="flex-shrink-0">
                      <img
                        src={order.medicine.image}
                        alt={order.medicine.name}
                        className="w-16 h-16 object-cover rounded-lg border"
                        onError={(e) => {
                          e.currentTarget.src = '/placeholder-medicine.png';
                        }}
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 mb-1">
                        {order.medicine.name}
                      </h4>
                      <p className="text-sm text-gray-600 mb-1">
                        Brand: {order.medicine.brand}
                      </p>
                      <p className="text-sm text-gray-600 mb-2">
                        Price: ৳{order.medicine.price}
                      </p>
                      <div className="flex items-center gap-4">
                        <span className="text-sm font-medium text-gray-700">
                          Quantity: {order.quantity}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Customer Information */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Customer Details
                  </h3>
                  
                  <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-700">{order.email}</span>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-700">{order.phone}</span>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-gray-500 mt-0.5" />
                      <span className="text-sm text-gray-700">{order.address}</span>
                    </div>
                  </div>
                </div>

                {/* Status Management */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">
                    Update Status
                  </h3>
                  
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="space-y-3">
                      <div className="text-sm text-gray-600">
                        Current Status: <span className="font-medium">{order.status}</span>
                      </div>
                      
                      <Select
                        value={order.status}
                        onValueChange={(value) => handleStatusChange(order.id, value as Order["status"])}
                        disabled={loadingId === order.id}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {statusOptions.map((status) => (
                            <SelectItem key={status.value} value={status.value}>
                              {status.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      
                      {loadingId === order.id && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Updating status...
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Footer */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center">
                  <div className="text-sm text-gray-600">
                    Order ID: <span className="font-mono font-medium">{order.id}</span>
                  </div>
                  
                  <div className="text-sm text-gray-600">
                    Last Updated: {formatDate(order.updatedAt)}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default OrderStatusChange;
