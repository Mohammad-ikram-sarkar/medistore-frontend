"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, Trash2 } from "lucide-react";

const AddToCart = () => {
  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    const storedCart = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );
    setCart(storedCart);
  }, []);

  // 🗑️ DELETE FUNCTION
  const handleDelete = (id: number) => {
    const updatedCart = cart.filter(
      (item) => item.id !== id
    );

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    
    // Dispatch custom event to update cart count
    window.dispatchEvent(new Event("cartUpdated"));
  };

  // 💰 CALCULATE TOTAL
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // 🛒 CHECKOUT FUNCTION
  const handleCheckout = () => {
    if (cart.length === 0) return;
    
    // Redirect to checkout page
    window.location.href = '/checkout';
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl ">
      <Card className="mt-30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl ">
            <ShoppingCart className="w-6 h-6" />
            My Cart
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {cart.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              Your cart is empty
            </p>
          ) : (
            cart.map((item, index) => (
              <div key={item.id}>
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      Price: {item.price} tk × {item.quantity}
                    </p>
                    <p className="font-medium mt-1">
                      Subtotal: {item.price * item.quantity} tk
                    </p>
                  </div>
                  
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => handleDelete(item.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                
                {index < cart.length - 1 && <Separator className="mt-4" />}
              </div>
            ))
          )}
        </CardContent>

        {cart.length > 0 && (
          <CardFooter className="flex flex-col gap-4">
            <Separator />
            
            <div className="w-full flex justify-between items-center text-lg font-semibold">
              <span>Total:</span>
              <span>{calculateTotal()} tk</span>
            </div>
            
            <Button 
              className="w-full" 
              size="lg"
              onClick={handleCheckout}
            >
              Proceed to Checkout
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default AddToCart;