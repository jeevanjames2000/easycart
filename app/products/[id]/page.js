"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { use } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  ShoppingCart,
  Heart,
  Star,
  Minus,
  Plus,
  Truck,
  Shield,
  RefreshCw,
} from "lucide-react";
import { useCart } from "@/contexts/cart-context";
import toast from "react-hot-toast";

async function getProduct(id) {
  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`);
    if (!res.ok) throw new Error("Failed to fetch product");
    const product = await res.json();
    return {
      id: product.id,
      name: product.title,
      price: Math.round(product.price),
      originalPrice: Math.round(product.price * 1.3),
      images: [product.image, product.image, product.image],
      category:
        product.category.charAt(0).toUpperCase() + product.category.slice(1),
      sale: product.price < 100,
      rating: product.rating.rate,
      reviewCount: product.rating.count,
      description: product.description,
      features: [
        "High-quality materials",
        "Durable design",
        "User-friendly interface",
        "Fast shipping",
      ],
      specifications: {
        "Product ID": product.id,
        Category: product.category,
        Price: `$${product.price}`,
        Rating: `${product.rating.rate} / 5`,
        "Review Count": product.rating.count,
      },
      inStock: true,
      stockCount: 20,
    };
  } catch (error) {
    console.error(error);
    return {
      id: 1,
      name: "Premium Wireless Headphones",
      price: 299,
      originalPrice: 399,
      images: [
        "/placeholder.svg?height=600&width=600",
        "/placeholder.svg?height=600&width=600",
        "/placeholder.svg?height=600&width=600",
      ],
      category: "Electronics",
      sale: true,
      rating: 4.5,
      reviewCount: 128,
      description:
        "Experience premium sound quality with our wireless headphones featuring active noise cancellation, 30-hour battery life, and premium comfort padding.",
      features: [
        "Active Noise Cancellation",
        "30-hour battery life",
        "Premium comfort padding",
        "Bluetooth 5.0 connectivity",
        "Quick charge technology",
      ],
      specifications: {
        "Driver Size": "40mm",
        "Frequency Response": "20Hz - 20kHz",
        "Battery Life": "30 hours",
        "Charging Time": "2 hours",
        Weight: "250g",
      },
      inStock: true,
      stockCount: 15,
    };
  }
}

export default function ProductPage({ params: paramsPromise }) {
  const params = use(paramsPromise); // Unwrap params using React.use()
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  // Fetch product data client-side
  useEffect(() => {
    async function fetchProduct() {
      const productData = await getProduct(params.id);
      setProduct(productData);
    }
    fetchProduct();
  }, [params.id]);

  const handleAddToCart = () => {
    if (!product) return;
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }

    toast.success("Added to cart");
  };

  const handleQuantityChange = (change) => {
    if (!product) return;
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= product.stockCount) {
      setQuantity(newQuantity);
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-8">Loading...</div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg border">
              <Image
                src={product.images[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                width={600}
                height={600}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square overflow-hidden rounded-lg border-2 ${
                    selectedImage === index ? "border-primary" : "border-muted"
                  }`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} ${index + 1}`}
                    width={200}
                    height={200}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary">{product.category}</Badge>
                {product.sale && <Badge variant="destructive">Sale</Badge>}
              </div>
              <h1 className="text-3xl font-bold tracking-tight">
                {product.name}
              </h1>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating)
                          ? "fill-primary text-primary"
                          : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through">
                    ${product.originalPrice}
                  </span>
                )}
              </div>
              {product.sale && (
                <p className="text-sm text-green-600">
                  Save ${product.originalPrice - product.price}
                </p>
              )}
            </div>
            <p className="text-muted-foreground">{product.description}</p>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <label className="text-sm font-medium">Quantity:</label>
                <div className="flex items-center border rounded-md">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="px-4 py-2 text-center min-w-[3rem]">
                    {quantity}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= product.stockCount}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.stockCount} in stock
                </span>
              </div>
              <div className="flex gap-4">
                <Button onClick={handleAddToCart} className="flex-1" size="lg">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
                <Button variant="outline" size="lg">
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <Separator />
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Truck className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Free Shipping</p>
                  <p className="text-sm text-muted-foreground">
                    On orders over $100
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">2 Year Warranty</p>
                  <p className="text-sm text-muted-foreground">
                    Full manufacturer warranty
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <RefreshCw className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">30-Day Returns</p>
                  <p className="text-sm text-muted-foreground">
                    Easy return policy
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16">
          <Tabs defaultValue="features" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="features" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Key Features</h3>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="specifications" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">
                    Technical Specifications
                  </h3>
                  <div className="space-y-3">
                    {Object.entries(product.specifications).map(
                      ([key, value]) => (
                        <div
                          key={key}
                          className="flex justify-between py-2 border-b"
                        >
                          <span className="font-medium">{key}</span>
                          <span className="text-muted-foreground">{value}</span>
                        </div>
                      )
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="reviews" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Customer Reviews</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="h-4 w-4 fill-primary text-primary"
                          />
                        ))}
                      </div>
                      <span className="font-medium">Excellent product!</span>
                    </div>
                    <p className="text-muted-foreground">
                      "Amazing sound quality and comfort. The noise cancellation
                      works perfectly."
                    </p>
                    <p className="text-sm text-muted-foreground">- John D.</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Footer />
    </div>
  );
}
