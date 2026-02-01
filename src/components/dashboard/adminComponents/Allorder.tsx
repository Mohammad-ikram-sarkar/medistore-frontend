"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Phone, Mail, Package, User, Hash } from 'lucide-react';

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
}

interface AllOrderProps {
  data: Order[];
}

const Allorder: React.FC<AllOrderProps> = ({ data }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'PROCESSING':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'COMPLETED':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'CANCELLED':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
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

  const getStatusStats = () => {
    const stats = data.reduce((acc, order) => {
      acc[order.status] = (acc[order.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return stats;
  };

  const stats = getStatusStats();

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">All Orders</h1>
          <p className="text-gray-600">Manage and monitor all customer orders</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Total Orders</p>
          <p className="text-2xl font-bold text-gray-900">{data.length}</p>
        </div>
      </div>

      {/* Order Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.PENDING || 0}</p>
              </div>
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                <Package className="w-4 h-4 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Processing</p>
                <p className="text-2xl font-bold text-blue-600">{stats.PROCESSING || 0}</p>
              </div>
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Package className="w-4 h-4 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-green-600">{stats.COMPLETED || 0}</p>
              </div>
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <Package className="w-4 h-4 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Cancelled</p>
                <p className="text-2xl font-bold text-red-600">{stats.CANCELLED || 0}</p>
              </div>
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                <Package className="w-4 h-4 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {data.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
              <p className="text-gray-600">There are no orders to display at the moment.</p>
            </CardContent>
          </Card>
        ) : (
          data.map((order) => (
            <Card key={order.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Hash className="w-4 h-4 text-gray-500" />
                      Order #{order.id.slice(-8)}
                    </CardTitle>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(order.createdAt)}
                      </div>
                      <div className="flex items-center gap-1">
                        <Package className="w-4 h-4" />
                        Qty: {order.quantity}
                      </div>
                    </div>
                  </div>
                  <Badge className={getStatusColor(order.status)}>
                    {order.status}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Customer Information */}
                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900 flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Customer Details
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Mail className="w-4 h-4" />
                        {order.email}
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Phone className="w-4 h-4" />
                        {order.phone}
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="w-4 h-4" />
                        {order.address}
                      </div>
                    </div>
                  </div>

                  {/* Order Information */}
                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900 flex items-center gap-2">
                      <Package className="w-4 h-4" />
                      Order Details
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Medicine ID:</span>
                        <span className="font-mono text-xs">{order.medicineId.slice(-8)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Quantity:</span>
                        <span className="font-medium">{order.quantity}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Last Updated:</span>
                        <span className="text-xs">{formatDate(order.updatedAt)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 mt-4 pt-4 border-t">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                  <Button variant="outline" size="sm">
                    Update Status
                  </Button>
                  <Button variant="outline" size="sm">
                    Contact Customer
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default Allorder;