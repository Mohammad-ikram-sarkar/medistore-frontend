'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ShoppingCart, Calendar, Package, Building2, Info, AlertCircle } from 'lucide-react';
import Link from 'next/link';

interface Product {
    id: string;
    name: string;
    brand: string;
    quantity: number;
    image: string;
    description: string;
    expiryDate: string;
    price: number;
    categoryId: string;
    authorId: string;
    createdAt: string;
    updatedAt: string;
}

interface ProductDetailProps {
    product: Product;
}

export default function Shopdetails({ product }: ProductDetailProps) {
    const expiryDate = new Date(product.expiryDate);
    const formattedExpiry = expiryDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const isExpiringSoon = () => {
        const today = new Date();
        const monthsUntilExpiry = (expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24 * 30);
        return monthsUntilExpiry < 6;
    };

    return (
        <Card className="min-h-screen">
            {/* Header */}



            <main className="container mx-auto px-4 py-8 md:py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12  mx-auto">
                    {/* Image Section */}
                    <div className="space-y-4">
                        <Card className="overflow-hidden border-2 border-slate-200 shadow-xl bg-white">
                            <CardContent className="p-0">
                                <div className="relative bg-gradient-to-br from-slate-100 to-slate-50">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className=" object-contain hover:scale-105 transition-transform duration-500"
                                    />
                                    {product.quantity < 20 && (
                                        <Badge className="absolute top-4 right-4 bg-orange-500 hover:bg-orange-600">
                                            Low Stock
                                        </Badge>
                                    )}
                                    {isExpiringSoon() && (
                                        <Badge className="absolute top-4 left-4 bg-red-500 hover:bg-red-600">
                                            <AlertCircle className="w-3 h-3 mr-1" />
                                            Expiring Soon
                                        </Badge>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Quick Info Cards */}
                        <div className="grid grid-cols-2 gap-4">
                            <Card className="border-l-4  transition-shadow">
                                <CardContent className="">
                                    <div className="flex items-center space-x-3">
                                        <Package className="w-5 h-5" />
                                        <div>
                                            <p className="font-medium">In Stock</p>
                                            <p className="text-xl font-bold">{product.quantity}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border-l-4 shadow-md hover:shadow-lg transition-shadow">
                                <CardContent className="">
                                    <div className="flex items-center space-x-3">
                                        <Calendar className="w-5 h-5" />
                                        <div>
                                            <p className=" font-medium">Expires</p>
                                            <p className=" font-bold ">
                                                {expiryDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Product Information */}
                    <div className="space-y-6">
                        <div>
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex-1">
                                    <h1 className="text-3xl md:text-4xl font-bold  mb-2 leading-tight">
                                        {product.name}
                                    </h1>
                                    <div className="flex items-center space-x-2 ">
                                        <Building2 className="w-4 h-4" />
                                        <span className="font-medium">{product.brand}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-baseline space-x-2 mb-6">
                                <span className="text-2xl md:text-3xl font-bold  ">
                                    ৳{product.price.toFixed(2)}
                                </span>
                                <span className=" text-sm">per unit</span>
                            </div>
                        </div>

                        <Separator />

                        {/* Description */}
                        <div className="rounded-lg p-6 border border-blue-100">
                            <div className="flex items-start space-x-3">
                                <Info className="w-5 h-5 mt-0.5 flex-shrink-0" />
                                <div>
                                    <h3 className="font-semibold  mb-2">Description</h3>
                                    <p className=" leading-relaxed">{product.description}</p>
                                </div>
                            </div>
                        </div>

                        {/* Product Details */}
                        <Card className=" shadow-md">
                            <CardContent className="p-6 space-y-4">
                                <h3 className="font-bold text-lg  mb-4">Product Details</h3>

                                <div className="space-y-3">
                                    <div className="flex justify-between items-center pb-3 border-b ">
                                        <span className=" font-medium">Product ID</span>
                                        <span className=" font-mono text-sm">{product.id.slice(-8)}</span>
                                    </div>

                                    <div className="flex justify-between items-center pb-3 border-b ">
                                        <span className="font-medium">Manufacturer</span>
                                        <span className="">{product.brand}</span>
                                    </div>

                                    <div className="flex justify-between items-center pb-3 border-b ">
                                        <span className=" font-medium">Expiry Date</span>
                                        <span >
                                            {formattedExpiry}
                                        </span>
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <span className=" font-medium">Available Quantity</span>
                                        <Badge variant={product.quantity < 20 ? 'destructive' : 'default'} className="font-semibold">
                                            {product.quantity} units
                                        </Badge>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Action Buttons */}
                        <div className="pt-4 flex gap-2 justify-between items-center ">
                            <Link href={"/cart"} className='flex-1'>
                            <Button
                             
                                className=" font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex-1 w-full"
                            >
                                <ShoppingCart className="w-5 h-5 mr-2" />
                                Add to Cart
                            </Button>

                            </Link>
                            
                            <Link href={"/checkout"} className='flex-1'>
                            <Button
                                
                                variant="outline"
                                className=" border-2  border-slate-300 hover:bg-slate-50 font-semibold  w-full "
                            >
                                Order
                            </Button>

                            </Link>
                            
                        </div>

                        {/* Warning Notice */}
                        <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
                            <div className="flex items-start space-x-3">
                                <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                                <div>
                                    <p className="text-sm text-amber-900 font-medium">
                                        Prescription Required
                                    </p>
                                    <p className="text-xs text-amber-700 mt-1">
                                        This medication requires a valid prescription. Please consult with a healthcare professional.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="border-t border-slate-200 bg-white/80 backdrop-blur-sm mt-16">
                <div className="container mx-auto px-4 py-6">
                    <p className="text-center text-slate-500 text-sm">
                        © 2026 PharmaCare. All medications are subject to availability and regulatory approval.
                    </p>
                </div>
            </footer>
        </Card>
    );
}