"use client";

import { Heart, Eye, ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { toast } from "sonner";

import { medicine } from "../../../types/medicine.type";
import Link from "next/link";

export default function Shop({ medicine }: { medicine: medicine }) {

  const handleAddToCart = () => {
    // get cart from localStorage
    const existingCart = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );

    // check if already exists
    const found = existingCart.find(
      (item: any) => item.id === medicine.id
    );

    if (found) {
      // quantity increase
      found.quantity += 1;
      toast.success("Quantity updated in cart", {
        description: `${medicine.name} quantity increased to ${found.quantity}`,
      });
    } else {
      // add new item
      existingCart.push({
        id: medicine.id,
        name: medicine.name,
        price: medicine.price,
        image: medicine.image,
        brand: medicine.brand,
        quantity: 1,
      });
      toast.success("Added to cart", {
        description: `${medicine.name} has been added to your cart`,
      });
    }

    // set cart again
    localStorage.setItem("cart", JSON.stringify(existingCart));
    
    // Dispatch custom event to update cart count
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const handleOrderNow = () => {
    // Add item to cart first
    const existingCart = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );

    // Check if already exists
    const found = existingCart.find(
      (item: any) => item.id === medicine.id
    );

    if (found) {
      // Quantity increase
      found.quantity += 1;
    } else {
      // Add new item
      existingCart.push({
        id: medicine.id,
        name: medicine.name,
        price: medicine.price,
        image: medicine.image,
        brand: medicine.brand,
        quantity: 1,
      });
    }

    // Save cart
    localStorage.setItem("cart", JSON.stringify(existingCart));
    
    // Dispatch custom event to update cart count
    window.dispatchEvent(new Event("cartUpdated"));

    // Show toast notification
    toast.success("Added to cart", {
      description: `${medicine.name} added. Redirecting to checkout...`,
    });

    // Small delay to ensure cart is saved, then redirect
    setTimeout(() => {
      window.location.href = "/checkout";
    }, 500);
  };

  return (
    <Card className="overflow-hidden rounded-2xl shadow-lg max-sm:mt-20 mt-10">
      {/* Image */}
      <div className="relative aspect-square h-[200px]">
        <img
          src={medicine.image}
          alt={medicine.name}
          className="object-cover w-full h-full"
        />
      </div>

      <CardHeader>
        <div className="flex items-center justify-between">
          <h2 className="text-[18px] font-bold">{medicine.name}</h2>
          <span className="text-[18px] font-bold">
            {medicine.price} tk
          </span>
        </div>

        <div className="flex items-center">
          {[1, 2, 3, 4].map((i) => (
            <Star
              key={i}
              className="w-3 h-3 fill-yellow-400 text-yellow-400"
            />
          ))}
          <Star className="w-3 h-3 text-gray-300" />
          <span className="text-[15px] ml-2">4.5</span>
        </div>
      </CardHeader>

      <CardContent>
        <p>{medicine.description}</p>
      </CardContent>

      <CardFooter className="flex flex-col gap-3">
        <div className="flex gap-3 w-full">
          <Link className="flex-1" href={`/shop/${medicine.id}`}>
            <Button variant="outline" size="icon" className="w-full">
              <Eye className="h-5 w-5" />
            </Button>
          </Link>

          {/* ADD TO CART */}
          <Button
            variant="outline"
            size="icon"
            className="flex-1"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-5 w-5" />
          </Button>
        </div>
   <Button
          className="w-full bg-gray-200 hover:bg-gray-300 text-black font-semibold"
          onClick={handleOrderNow}
        >
          Order Now
        </Button>
        
      </CardFooter>
    </Card>
  );
}