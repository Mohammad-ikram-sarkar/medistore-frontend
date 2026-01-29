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


export default function Shop({ medicine } : { medicine: medicine }) {
    // console.log(medicine);
  
  return (
    <Card className="  overflow-hidden rounded-2xl shadow-lg ">
      {/* Image Section */}
      <div className="relative aspect-square  h-[200px]">
        <img
          src={medicine.image}
          alt="Red Hat"
          className="object-cover w-full h-full "
        />
        {/* <Badge 
          className="absolute top-4 right-4 bg-gray-200/80 text-black hover:bg-gray-200"
          variant="secondary"
        >
          Clothing
        </Badge> */}
      </div>

      <CardHeader className=" ">
        <div className="flex items-center justify-between">
            <h2 className="text-[18px] font-bold tracking-tight">{medicine.name}</h2>
          <span className="text-[18px] font-bold">{medicine.price} tk</span> 
        </div>
        <div>

        </div>
        
        <div className="flex items-center ">
          {[1, 2, 3, 4].map((i) => (
            <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
          ))}
          <Star className="w-3 h-3 text-gray-300" />
          <span className="text-[15px] text-muted-foreground ml-2">4.5 </span>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className=" tracking-tight ">
          {medicine.description}
        </p>
        
      </CardContent>

      <CardFooter className="flex flex-col gap-3 pb-6">
        
        <div className="flex gap-3 w-full">
         <Link className="flex-1 " href={`/shop/${medicine.id}`} >
            <Button variant="outline" size="icon" className="w-full" >
            <Eye className="h-5 w-5" />
          </Button>
         </Link>
          <Link href={`/addtocart`} className="flex-1 ">
               <Button variant="outline" size="icon" className="w-full">
              <ShoppingCart className="mr-2 h-5 w-5" />
          </Button>
          </Link>
          
        </div>
        <Button className="w-full bg-gray-200 hover:bg-gray-300 text-black   font-semibold ">
         Order
        </Button>

      </CardFooter>
    </Card>
  );
}