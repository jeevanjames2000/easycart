// app/about/page.jsx
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ShoppingBag, Heart, Star, Truck } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container space-y-12">
        {/* Hero Section */}
        <section className="text-center ">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            About EasyCart
          </h1>
          <p className="mt-4 text-xl text-muted-foreground">Maximum Value</p>
          <p className="mt-2 max-w-2xl mx-auto mb-5 text-lg text-foreground/80">
            Discover our curated collection of premium products designed with
            elegance and simplicity in mind.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-primary p-2 text-white hover:bg-primary/90"
          >
            <Link href="/products">Shop Now</Link>
          </Button>
        </section>

        <Separator />

        {/* Our Story */}
        <section className="grid gap-8 md:grid-cols-2 items-center">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">Our Story</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Founded in 2023, EasyCart was born out of a passion for making
              online shopping effortless and delightful. We believe that
              everyone deserves access to high-quality products without the
              complexity. Our mission is to curate a selection of goods that
              blend style, functionality, and affordability, delivering maximum
              value to our customers.
            </p>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1557821552-17105176677c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="EasyCart products"
              className="rounded-lg object-cover w-full h-64 md:h-80 shadow-lg"
            />
          </div>
        </section>

        <Separator />

        {/* Our Values */}
        <section>
          <h2 className="text-3xl font-semibold tracking-tight text-center">
            Our Values
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <Card className="text-center">
              <CardHeader>
                <ShoppingBag className="h-8 w-8 mx-auto text-primary" />
                <CardTitle className="text-lg">Curated Quality</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We handpick every product to ensure it meets our standards of
                  elegance, durability, and value.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <Heart className="h-8 w-8 mx-auto text-primary" />
                <CardTitle className="text-lg">Customer First</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Your satisfaction is our priority. We strive to provide
                  seamless shopping and exceptional support.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <Truck className="h-8 w-8 mx-auto text-primary" />
                <CardTitle className="text-lg">Fast Delivery</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Enjoy quick and reliable shipping to get your favorite
                  products delivered right to your door.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator />

        {/* Call to Action */}
        <section className="text-center">
          <h2 className="text-3xl font-semibold tracking-tight">
            Join the EasyCart Community
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Become part of our growing family of shoppers who trust EasyCart for
            quality and convenience. Explore our collection today!
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <Button asChild size="lg" className="text-white p-1 text-xs">
              <Link href="/register">Sign Up</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/products">Browse Products</Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
