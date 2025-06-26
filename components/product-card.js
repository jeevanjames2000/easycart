"use client";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/cart-context";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
export function ProductCard({ product }) {
  const { user, loading } = useAuth();
  const { addItem } = useCart();
  const router = useRouter();
  const handleAddToCart = (e, product) => {
    e.preventDefault();
    if (loading) return;
    if (!user) {
      toast.error("Please log in to continue!");
      router.push("/login");
      return;
    }
    addItem(product);
    toast.success("Added to Cart");
  };
  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg">
      <Link href={`/products/${product.id}`}>
        <div className="aspect-square overflow-hidden">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            width={400}
            height={400}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
        </div>
      </Link>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <Link href={`/products/${product.id}`}>
              <h3 className="font-semibold leading-none tracking-tight hover:underline">
                {product.name}
              </h3>
            </Link>
            <p className="text-sm text-muted-foreground">{product.category}</p>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Heart className="h-4 w-4" />
          </Button>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold">${product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
          {product.sale && <Badge variant="destructive">Sale</Badge>}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          onClick={(e) => handleAddToCart(e, product)}
          className="w-full text-white flex p-2"
          size="sm"
          disabled={loading}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
