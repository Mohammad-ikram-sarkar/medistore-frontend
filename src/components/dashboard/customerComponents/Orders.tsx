"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Package, 
  Calendar, 
  Phone, 
  MapPin, 
  User, 
  Mail,
  Clock,
  CheckCircle,
  AlertCircle,
  Truck
} from 'lucide-react';

interface Medicine {
  image: string;
  name: string;
}

interface Order {
  id: string;
  authorId: string;
  email: string;
  phone: string;
  address: string;
  medicineId: string;
  quantity: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  medicine: Medicine;
}

interface OrdersProps {
  data: Order[];
}

const Orders: React.FC<OrdersProps> = ({ data }) => {
  const getStatusColor = (status: string) => {
    switch (status.toUpperCase()) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'PROCESSING':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'SHIPPED':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'DELIVERED':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'CANCELLED':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toUpperCase()) {
      case 'PENDING':
        return <Clock className="w-4 h-4" />;
      case 'PROCESSING':
        return <AlertCircle className="w-4 h-4" />;
      case 'SHIPPED':
        return <Truck className="w-4 h-4" />;
      case 'DELIVERED':
        return <CheckCircle className="w-4 h-4" />;
      case 'CANCELLED':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Package className="w-4 h-4" />;
    }
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

  if (!data || data.length === 0) {
    return (
      <div className="container mx-auto p-6">
        <Card className="text-center py-12">
          <CardContent>
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Orders Found</h3>
            <p className="text-gray-500">You haven't placed any orders yet.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
        <Badge variant="outline" className="text-lg px-4 py-2">
          {data.length} {data.length === 1 ? 'Order' : 'Orders'}
        </Badge>
      </div>

      <div className="grid gap-6">
        {data.map((order) => (
          <Card key={order.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Package className="w-6 h-6 text-blue-600" />
                  <div>
                    <CardTitle className="text-lg font-semibold">
                      Order #{order.id.slice(-8)}
                    </CardTitle>
                    <p className="text-sm text-gray-600">
                      Placed on {formatDate(order.createdAt)}
                    </p>
                  </div>
                </div>
                
                <Badge 
                  className={`flex items-center gap-2 px-3 py-1 font-medium ${getStatusColor(order.status)}`}
                >
                  {getStatusIcon(order.status)}
                  {order.status.toUpperCase()}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                      <p className="text-sm text-gray-600 mb-2">
                        Medicine ID: {order.medicineId.slice(-8)}
                      </p>
                      <div className="flex items-center gap-4">
                        <span className="text-sm font-medium text-gray-700">
                          Quantity: {order.quantity}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Customer & Delivery Information */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Delivery Information
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
              </div>

              <Separator className="my-6" />

              {/* Order Timeline */}
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Order Timeline
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div>
                      <p className="font-medium text-blue-900">Order Placed</p>
                      <p className="text-blue-700">{formatDate(order.createdAt)}</p>
                    </div>
                  </div>
                  
                  {order.updatedAt !== order.createdAt && (
                    <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div>
                        <p className="font-medium text-green-900">Last Updated</p>
                        <p className="text-green-700">{formatDate(order.updatedAt)}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Order Actions */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center">
                  <div className="text-sm text-gray-600">
                    Order ID: <span className="font-mono font-medium">{order.id}</span>
                  </div>
                  
                  <div className="flex gap-2">
                    {order.status.toUpperCase() === 'PENDING' && (
                      <Badge variant="outline" className="text-orange-600 border-orange-200">
                        Awaiting Confirmation
                      </Badge>
                    )}
                    {order.status.toUpperCase() === 'PROCESSING' && (
                      <Badge variant="outline" className="text-blue-600 border-blue-200">
                        Being Prepared
                      </Badge>
                    )}
                    {order.status.toUpperCase() === 'DELIVERED' && (
                      <Badge variant="outline" className="text-green-600 border-green-200">
                        Completed
                      </Badge>
                    )}
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

export default Orders;