"use client";

import { useState } from "react";
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
import { authClient } from "@/lib/auth-client";
import { Role } from "@/constants/Role";

export default function Shop({ medicine }: { medicine: medicine }) {
  const { data: session } = authClient.useSession();
  const userRole = (session?.user as any)?.role || null;
  const isLoggedIn = !!session?.user;
  const isCustomer = userRole === Role.CUSTOMER;
  
  // State for description expansion and wishlist
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);
  
  // Function to truncate description to 5 words
  const truncateDescription = (text: string, maxWords: number = 5) => {
    if (!text) return "";
    const words = text.split(' ');
    if (words.length <= maxWords) return text;
    return words.slice(0, maxWords).join(' ') + "...";
  };
  
  const shouldShowReadMore = medicine.description && medicine.description.split(' ').length > 5;

  // Check if item is in wishlist on component mount
  useState(() => {
    if (typeof window !== 'undefined') {
      const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
      setIsInWishlist(wishlist.some((item: any) => item.id === medicine.id));
    }
  });

  const handleWishlistToggle = () => {
    if (!isLoggedIn) {
      toast.error("Please Login", {
        description: "You need to login to add items to wishlist.",
      });
      return;
    }

    const existingWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    const itemIndex = existingWishlist.findIndex((item: any) => item.id === medicine.id);

    if (itemIndex > -1) {
      // Remove from wishlist
      existingWishlist.splice(itemIndex, 1);
      setIsInWishlist(false);
      toast.success("Removed from wishlist", {
        description: `${medicine.name} has been removed from your wishlist`,
      });
    } else {
      // Add to wishlist
      existingWishlist.push({
        id: medicine.id,
        name: medicine.name,
        price: medicine.price,
        image: medicine.image,
        brand: medicine.brand,
      });
      setIsInWishlist(true);
      toast.success("Added to wishlist", {
        description: `${medicine.name} has been added to your wishlist`,
      });
    }

    localStorage.setItem("wishlist", JSON.stringify(existingWishlist));
  };

  const handleAddToCart = () => {
    // Check if user is logged in first
    if (!isLoggedIn) {
      toast.error("Please Login", {
        description: "You need to login to add items to cart.",
      });
      return;
    }

    if (!isCustomer) {
      toast.error("Access Denied", {
        description: "Only customers can add items to cart. Please login as a customer.",
      });
      return;
    }

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
    // Check if user is logged in first
    if (!isLoggedIn) {
      toast.error("Please Login", {
        description: "You need to login to place orders.",
      });
      return;
    }

    if (!isCustomer) {
      toast.error("Access Denied", {
        description: "Only customers can place orders. Please login as a customer.",
      });
      return;
    }

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

      <CardHeader className="pb-3">
        <div className="space-y-3">
          {/* Title and Price */}
          <div className="flex items-start justify-between gap-2">
            <h2 className="text-lg font-bold text-gray-900 leading-tight line-clamp-2 flex-1">
              {medicine.name}
            </h2>
            <div className="text-right flex-shrink-0">
              <span className="text-lg font-bold text-green-600">
                ৳{medicine.price}
              </span>
            </div>
          </div>

          {/* Rating */}
          {/* <div className="flex items-center gap-2">
            <div className="flex items-center">
              {[1, 2, 3, 4].map((i) => (
                <Star
                  key={i}
                  className="w-3 h-3 fill-yellow-400 text-yellow-400"
                />
              ))}
              <Star className="w-3 h-3 text-gray-300" />
            </div>
            <span className="text-sm text-gray-500">4.5</span>
          </div>
           */}
          {/* Stock Status */}
          {/* <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${medicine.quantity > 0 ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className={`text-xs font-medium ${medicine.quantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {medicine.quantity > 0 ? `${medicine.quantity} in stock` : 'Out of stock'}
              </span>
            </div>
          </div> */}
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-2">
          {/* Brand and Expiry */}
          {/* <div className="space-y-1">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Brand:</span>
              <span className="font-medium text-gray-700">{medicine.brand}</span>
            </div>
            {medicine.expiryDate && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Expires:</span>
                <span className="text-xs text-gray-600">
                  {new Date(medicine.expiryDate).toLocaleDateString()}
                </span>
              </div>
            )}
          </div> */}
          
          {/* Description */}
          <div className="text-sm text-gray-600">
            <p className="leading-relaxed">
              {isDescriptionExpanded 
                ? medicine.description 
                : truncateDescription(medicine.description)
              }
            </p>
            
            {shouldShowReadMore && (
              <button
                onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                className="text-blue-600 hover:text-blue-800 text-xs font-medium mt-1 transition-colors"
              >
                {isDescriptionExpanded ? "Read Less" : "Read More"}
              </button>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col gap-3 pt-4">
        {/* Action Buttons Row */}
        <div className="flex gap-2 w-full">
          {/* View Details */}
          <Link className="flex-1" href={`/shop/${medicine.id}`}>
            <Button variant="outline" size="sm" className="w-full h-9 text-xs">
              <Eye className="h-4 w-4 mr-1" />
              View
            </Button>
          </Link>

          {/* Wishlist Button */}
          <Button
            variant="outline"
            size="sm"
            className={`h-9 px-3 ${isInWishlist ? 'text-red-600 border-red-200 bg-red-50' : ''}`}
            onClick={handleWishlistToggle}
          >
            <Heart className={`h-4 w-4 ${isInWishlist ? 'fill-red-600' : ''}`} />
          </Button>

          {/* Add to Cart Button */}
          {isLoggedIn && isCustomer && medicine.quantity > 0 ? (
            <Button
              variant="outline"
              size="sm"
              className="flex-1 h-9 text-xs"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-4 w-4 mr-1" />
              Add
            </Button>
          ) : (
            <Button
              variant="outline"
              size="sm"
              className="flex-1 h-9 text-xs opacity-50 cursor-not-allowed"
              disabled
            >
              <ShoppingCart className="h-4 w-4 mr-1" />
              {medicine.quantity === 0 ? 'Out of Stock' : !isLoggedIn ? 'Login' : 'Customer Only'}
            </Button>
          )}
        </div>

        {/* Order Now Button */}
        {isLoggedIn && isCustomer && medicine.quantity > 0 ? (
          <Button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium h-9"
            onClick={handleOrderNow}
          >
            Order Now
          </Button>
        ) : (
          <Button
            className="w-full bg-gray-100 text-gray-500 font-medium cursor-not-allowed h-9"
            disabled
          >
            {medicine.quantity === 0 
              ? "Out of Stock" 
              : !isLoggedIn 
                ? "Login Required" 
                : "Customer Only"
            }
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}