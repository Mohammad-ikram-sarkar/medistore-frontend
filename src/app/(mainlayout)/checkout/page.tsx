"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  User, 
  ShoppingBag,
  CheckCircle,
  ArrowLeft
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { createOrderAction } from "@/action/order.action";
import { authClient } from "@/lib/auth-client";
import { RoleGuard } from "@/components/auth/RoleGuard";
import { Role } from "@/constants/Role";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  brand: string;
}

const CheckoutPage = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [cartLoaded, setCartLoaded] = useState(false);
  const { data: session } = authClient.useSession();

  // Form state
  const [customerInfo, setCustomerInfo] = useState({
    phone: "",
    address: "",
  });

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);
    setCartLoaded(true);
  }, []);

  const calculateSubtotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateShipping = () => {
    return cart.length > 0 ? 50 : 0; // 50 tk shipping fee
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateShipping();
  };

  const handleInputChange = (field: string, value: string) => {
    setCustomerInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = () => {
    const { phone, address } = customerInfo;
    if (!phone || !address) {
      toast.error("Please fill in all required fields");
      return false;
    }

    // Basic phone validation (Bangladesh format)
    const phoneRegex = /^(\+88)?01[3-9]\d{8}$/;
    if (!phoneRegex.test(phone)) {
      toast.error("Please enter a valid phone number");
      return false;
    }

    if (!session?.user?.id) {
      toast.error("Please login to place an order");
      return false;
    }

    return true;
  };

  const handlePlaceOrder = async () => {
    if (cart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Create orders for each item in cart
      const orderPromises = cart.map(async (item) => {
        const orderData = {
          phone: customerInfo.phone,
          address: customerInfo.address,
          quantity: item.quantity,
          medicineId: item.id,
          authorId: session?.user?.id || ""
        };

        return await createOrderAction(orderData);
      });

      const results = await Promise.all(orderPromises);
      
      // Check if all orders were successful
      const failedOrders = results.filter(result => !result.success);
      
      if (failedOrders.length > 0) {
        toast.error("Some orders failed to process. Please try again.");
        console.error("Failed orders:", failedOrders);
        return;
      }

      // Generate a combined order ID for display
      const newOrderId = `ORD-${Date.now()}`;
      
      // Save order summary to localStorage for order history
      const orderSummary = {
        orderId: newOrderId,
        items: cart,
        customerInfo: {
          phone: customerInfo.phone,
          address: customerInfo.address,
          email: session?.user?.email || "",
          name: session?.user?.name || ""
        },
        totalAmount: calculateTotal(),
        orderDate: new Date().toISOString(),
        status: "pending",
        backendOrders: results.map(r => r.success && 'data' in r ? r.data : null).filter(Boolean)
      };

      const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]");
      existingOrders.push(orderSummary);
      localStorage.setItem("orders", JSON.stringify(existingOrders));

      // Clear cart
      localStorage.removeItem("cart");
      setCart([]);
      
      // Dispatch custom event to update cart count
      window.dispatchEvent(new Event("cartUpdated"));
      
      setOrderId(newOrderId);
      setOrderPlaced(true);
      
      toast.success("Order placed successfully!", {
        description: `Your order ${newOrderId} has been confirmed`
      });

    } catch (error) {
      console.error("Order placement error:", error);
      toast.error("Failed to place order. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const CheckoutContent = () => {
    if (orderPlaced) {
      return (
        <div className="container mx-auto p-4 max-w-2xl">
          <Card className="mt-8 text-center">
            <CardContent className="pt-8 pb-8">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-green-700 mb-2">
                Order Placed Successfully!
              </h1>
              <p className="text-gray-600 mb-4">
                Thank you for your order. Your order ID is:
              </p>
              <Badge variant="outline" className="text-lg px-4 py-2 mb-6">
                {orderId}
              </Badge>
              <p className="text-sm text-gray-500 mb-6">
                Your order has been sent to our system and will be processed shortly.
              </p>
              <div className="flex gap-4 justify-center">
                <Link href="/shop">
                  <Button variant="outline">
                    Continue Shopping
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button>
                    View Orders
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    if (!cartLoaded) {
      return (
        <div className="container mx-auto p-4 max-w-2xl">
          <Card className="mt-8 text-center">
            <CardContent className="pt-8 pb-8">
              <div className="w-16 h-16 mx-auto mb-4 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
              <h1 className="text-xl font-semibold mb-2">Loading...</h1>
              <p className="text-gray-600">
                Please wait while we load your cart.
              </p>
            </CardContent>
          </Card>
        </div>
      );
    }

    if (cart.length === 0) {
      return (
        <div className="container mx-auto p-4 max-w-2xl ">
          <Card className="mt-8 text-center mt-20">
            <CardContent className="pt-8 pb-8">
              <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h1 className="text-xl font-semibold mb-2">Your cart is empty</h1>
              <p className="text-gray-600 mb-6">
                Add some medicines to your cart before proceeding to checkout.
              </p>
              <Link href="/shop">
                <Button>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Continue Shopping
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      );
    }

    return (
      <div className="container mx-auto p-4 max-w-4xl">
       

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-20">
          {/* Customer Information Form */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Customer Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <Label>Name</Label>
                    <Input
                      value={session?.user?.name || ""}
                      disabled
                      className="bg-gray-50"
                    />
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input
                      value={session?.user?.email || ""}
                      disabled
                      className="bg-gray-50"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Delivery Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    placeholder="+880 1XXXXXXXXX"
                    value={customerInfo.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="address">Delivery Address *</Label>
                  <Textarea
                    id="address"
                    placeholder="Enter your complete delivery address"
                    value={customerInfo.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-sm text-gray-600">{item.brand}</p>
                      <p className="text-sm">
                        ৳{item.price} × {item.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">৳{item.price * item.quantity}</p>
                    </div>
                  </div>
                ))}
                
                <Separator />
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>৳{calculateSubtotal()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping:</span>
                    <span>৳{calculateShipping()}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total:</span>
                    <span>৳{calculateTotal()}</span>
                  </div>
                </div>
                
                <Button 
                  className="w-full mt-6" 
                  size="lg"
                  onClick={handlePlaceOrder}
                  disabled={isLoading}
                >
                  {isLoading ? "Placing Order..." : `Place Order - ৳${calculateTotal()}`}
                </Button>
                
                <p className="text-xs text-gray-500 text-center mt-2">
                  By placing this order, you agree to our terms and conditions.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  };

  return (
    <RoleGuard allowedRoles={[Role.CUSTOMER]} fallbackPath="/shop">
      <CheckoutContent />
    </RoleGuard>
  );
};

export default CheckoutPage;