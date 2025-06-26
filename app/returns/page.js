"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Package, ArrowLeft } from "lucide-react";
import Link from "next/link";
export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container space-y-12">
        <section className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Returns & Refunds
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            We want you to love your EasyCart purchase. Learn about our
            hassle-free return policy.
          </p>
        </section>
        <Separator />
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-6 w-6 text-primary" />
              Our Return Policy
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold">30-Day Return Window</h3>
              <p className="mt-2 text-muted-foreground">
                You can return most items within 30 days of delivery for a full
                refund or exchange, provided they are unused and in their
                original packaging.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">How to Return</h3>
              <p className="mt-2 text-muted-foreground">
                1. Contact our support team at support@easycart.com to initiate
                a return.
                <br />
                2. Package your item securely and include the return form.
                <br />
                3. Ship the package to our return center at 123 EasyCart Way,
                Shop City, SC 12345.
                <br />
                4. Once received, we'll process your refund within 5-7 business
                days.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Non-Returnable Items</h3>
              <p className="mt-2 text-muted-foreground">
                Certain items, such as personalized products or clearance items,
                are non-returnable. Please check the product page for details.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Need Help?</h3>
              <p className="mt-2 text-muted-foreground">
                If you have questions about your return, reach out to us at +1
                (800) 123-4567 or via our contact form.
              </p>
            </div>
            <Button asChild className="w-full text-white md:w-auto">
              <Link href="/contact-us">Contact Support</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
