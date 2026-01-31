import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Calendar, 
  Mail, 
  Phone, 
  MapPin, 
  Package, 
  User,
  Clock,
  Pill
} from 'lucide-react';

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
  status: 'PENDING' | 'CONFIRMED' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  createdAt: string;
  updatedAt: string;
  medicine: Medicine;
}

interface OrderDataProps {
  data: Order[];
}

const OrderData: React.FC<OrderDataProps> = ({ data }) => {
  const getStatusColor = (status: Order['status']) => {
    const colors = {
      PENDING: 'bg-yellow-500 hover:bg-yellow-600',
      CONFIRMED: 'bg-blue-500 hover:bg-blue-600',
      SHIPPED: 'bg-purple-500 hover:bg-purple-600',
      DELIVERED: 'bg-green-500 hover:bg-green-600',
      CANCELLED: 'bg-red-500 hover:bg-red-600'
    };
    return colors[status] || 'bg-gray-500';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-4 w-full max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Orders ({data.length})</h2>
      
      {data.map((order) => (
        <Card key={order.id} className="w-full">
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <CardTitle className="text-lg font-semibold">
                  Order #{order.id.slice(-8)}
                </CardTitle>
                <p className="text-xs text-muted-foreground font-mono mt-1">
                  {order.id}
                </p>
              </div>
              <Badge className={getStatusColor(order.status)}>
                {order.status}
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Medicine Information with Image */}
            <div className="flex gap-4 p-4 bg-muted rounded-lg">
              <img 
                src={order.medicine.image} 
                alt={order.medicine.name}
                className="w-20 h-20 object-cover rounded-md"
              />
              <div className="flex-1 space-y-1">
                <h3 className="font-semibold">{order.medicine.name}</h3>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <Pill className="h-3 w-3" />
                  {order.medicine.brand}
                </p>
                <div className="flex items-center gap-4 text-sm">
                  <span className="font-semibold text-green-600">
                    ৳{order.medicine.price}
                  </span>
                  <span className="text-muted-foreground">
                    Qty: {order.quantity}
                  </span>
                  <span className="font-semibold">
                    Total: ৳{order.medicine.price * order.quantity}
                  </span>
                </div>
              </div>
            </div>

            <Separator />

            {/* Customer Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="space-y-2">
                <h4 className="font-semibold text-sm text-muted-foreground uppercase">
                  Customer Details
                </h4>
                
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{order.email}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{order.phone}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{order.address}</span>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-sm text-muted-foreground uppercase">
                  Order Timeline
                </h4>
                
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Created</p>
                    <p>{formatDate(order.createdAt)}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Last Updated</p>
                    <p>{formatDate(order.updatedAt)}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default OrderData;