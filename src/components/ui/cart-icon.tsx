"use client";

import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Role } from "@/constants/Role";

export const CartIcon = () => {
  const [cartCount, setCartCount] = useState(0);
  const { data: session } = authClient.useSession();

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const totalItems = cart.reduce((total: number, item: any) => total + item.quantity, 0);
      setCartCount(totalItems);
    };

    // Initial load
    updateCartCount();

    // Listen for storage changes (when cart is updated from other components)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "cart") {
        updateCartCount();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    // Also listen for custom cart update events
    const handleCartUpdate = () => {
      updateCartCount();
    };

    window.addEventListener("cartUpdated", handleCartUpdate);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("cartUpdated", handleCartUpdate);
    };
  }, []);

  // Only show cart icon for customers
  const userRole = (session?.user as any)?.role || "customer";
  if (userRole !== Role.CUSTOMER) {
    return null;
  }

  return (
    <Link href="/cart">
      <Button variant="outline" size="sm" className="relative">
        <ShoppingCart className="h-4 w-4" />
        {cartCount > 0 && (
          <Badge 
            variant="destructive" 
            className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
          >
            {cartCount > 99 ? "99+" : cartCount}
          </Badge>
        )}
      </Button>
    </Link>
  );
};