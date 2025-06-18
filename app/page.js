// app/page.js
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Truck, Shield, RefreshCw, Headphones } from "lucide-react";

const featuredProducts = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 299,
    originalPrice: 399,
    image: "/pexels-garrettmorrow-1649771.jpg",
    category: "Electronics",
    sale: true,
  },
  {
    id: 2,
    name: "Minimalist Watch",
    price: 199,
    image: "/pexels-castorlystock-3829442.jpg",
    category: "Accessories",
  },
  {
    id: 3,
    name: "Classic T-Shirt",
    price: 49,
    image: "/pexels-anna-nekrashevich-8532616.jpg",
    category: "Clothing",
  },
  {
    id: 4,
    name: "Leather Wallet",
    price: 89,
    image: "/pexels-lantip-54516180-11676702.jpg",
    category: "Accessories",
  },
];

const categories = [
  {
    name: "Electronics",
    image: "/pexels-joshsorenson-1334602.jpg",
    count: 24,
  },
  {
    name: "Clothing",
    image: "/pexels-pavel-danilyuk-6612782.jpg",
    count: 18,
  },
  {
    name: "Accessories",
    image: "/pexels-mohammad-yasir-3365802-5330724.jpg",
    count: 12,
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-black">
      <Header />
      <section className="relative overflow-hidden bg-gradient-to-r from-white to-gray-100">
        <div className="container py-24 lg:py-32">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
            <div className="flex flex-col justify-center space-y-8">
              <div className="space-y-4">
                <Badge className="w-fit p-2 bg-gray-200 text-black">
                  New Collection
                </Badge>
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  EasyCart
                  <br />
                  <span className="text-gray-600">Maximum Value</span>
                </h1>
                <p className="max-w-[600px] text-gray-600 md:text-xl">
                  Discover our curated collection of premium products designed
                  with elegance and simplicity in mind.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/products">
                  <Button
                    size="lg"
                    className="w-full min-[400px]:w-auto p-2 bg-black text-white hover:bg-gray-800 flex"
                  >
                    Shop Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/about">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full min-[400px]:w-auto p-2 border-gray-300 text-black hover:bg-gray-100"
                  >
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <Image
                src="/pexels-cottonbro-6069821.jpg"
                alt="Hero Product"
                width={500}
                height={500}
                className="rounded-lg object-cover"
                priority // Load hero image immediately
                placeholder="blur"
                blurDataURL="/pexels-cottonbro-6069821.jpg?blur"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col items-center text-center space-y-2">
              <Truck className="h-8 w-8 mb-2 text-black" />
              <h3 className="font-semibold text-black">Free Shipping</h3>
              <p className="text-sm text-gray-600">On orders over $100</p>
            </div>
            <div className="flex flex-col items-center text-center space-y-2">
              <Shield className="h-8 w-8 mb-2 text-black" />
              <h3 className="font-semibold text-black">Secure Payment</h3>
              <p className="text-sm text-gray-600">100% secure transactions</p>
            </div>
            <div className="flex flex-col items-center text-center space-y-2">
              <RefreshCw className="h-8 w-8 mb-2 text-black" />
              <h3 className="font-semibold text-black">Easy Returns</h3>
              <p className="text-sm text-gray-600">30-day return policy</p>
            </div>
            <div className="flex flex-col items-center text-center space-y-2">
              <Headphones className="h-8 w-8 mb-2 text-black" />
              <h3 className="font-semibold text-black">24/7 Support</h3>
              <p className="text-sm text-gray-600">Always here to help</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-black">
              Shop by Category
            </h2>
            <p className="mt-4 text-gray-600">
              Explore our carefully curated categories
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={`/categories/${category.name.toLowerCase()}`}
              >
                <Card className="group overflow-hidden transition-all hover:shadow-lg bg-white border-gray-200">
                  <div className="aspect-square overflow-hidden">
                    <Image
                      src={category.image}
                      alt={category.name}
                      width={300}
                      height={300}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                      placeholder="blur"
                      blurDataURL={`${category.image}?blur`}
                    />
                  </div>
                  <CardContent className="p-6 text-center">
                    <h3 className="text-xl font-semibold text-black">
                      {category.name}
                    </h3>
                    <p className="text-gray-600">{category.count} products</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-black">
                Featured Products
              </h2>
              <p className="mt-4 text-gray-600">
                Handpicked favorites from our collection
              </p>
            </div>
            <Link href="/products">
              <Button
                variant="outline"
                className="border-gray-300 text-black hover:bg-gray-100 flex"
              >
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container">
          <Card className="bg-white border-gray-200">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-4 text-black">
                Stay Updated
              </h2>
              <p className="mb-6 text-gray-600">
                Subscribe to our newsletter for the latest products and
                exclusive offers.
              </p>
              <div className="flex flex-col gap-2 max-w-md mx-auto sm:flex-row">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 rounded-md bg-gray-100 text-black border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                />
                <Button className="bg-black text-white hover:bg-gray-800">
                  Subscribe
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
      <Footer />
    </div>
  );
}
