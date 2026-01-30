"use client";

import { Heart, Eye, ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

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
    } else {
      // add new item
      existingCart.push({
        id: medicine.id,
        name: medicine.name,
        price: medicine.price,
        image: medicine.image,
        brand : medicine.brand,
        
       
        quantity: 1,
      });
    }

    // set cart again
    localStorage.setItem("cart", JSON.stringify(existingCart));
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
          <Link href={"/cart"} className="flex-1">
          <Button
            variant="outline"
            size="icon"
            className="w-full"
            
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-5 w-5" />
          </Button>
          </Link>
          
        </div>

        <Button
          className="w-full bg-gray-200 hover:bg-gray-300 text-black font-semibold"
          onClick={handleAddToCart}
        >
          Order
        </Button>
      </CardFooter>
    </Card>
  );
}
