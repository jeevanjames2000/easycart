"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/auth-context";

import { useRouter } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, Package } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
export default function OrderSuccessPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [order, setOrder] = useState(() => {
    if (typeof window !== "undefined") {
      const storedOrder = localStorage.getItem("latestOrder");
      return storedOrder ? JSON.parse(storedOrder) : null;
    }
    return null;
  });
  useEffect(() => {
    if (order) {
      localStorage.removeItem("latestOrder");
    }
  }, [order]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!user) {
      toast.error("Please log in to view your order details.");

      router.push("/login");
      return;
    }
    const fetchLatestOrder = async () => {
      try {
        const response = await fetch(
          `https://easycartbackend.onrender.com/orders/${encodeURIComponent(
            user.email
          )}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch order");
        }
        const latestOrder = data.orders[0];
        setOrder(latestOrder);
      } catch (error) {
        toast.error("Failed to load order details.");
      } finally {
        setLoading(false);
      }
    };
    fetchLatestOrder();
  }, [user, toast, router]);
  if (!user) {
    return null;
  }
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container py-16">
        <Card className="max-w-3xl mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2">
              <CheckCircle className="h-6 w-6 text-primary" />
              Order Confirmed
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <h2 className="text-xl font-semibold">
                Thank you for your purchase!
              </h2>
              <p className="text-muted-foreground mt-2">
                Your order has been successfully placed. You'll receive a
                confirmation email with details shortly.
              </p>
            </div>
            {loading ? (
              <p className="text-center text-muted-foreground">
                Loading order details...
              </p>
            ) : !order ? (
              <p className="text-center text-muted-foreground">
                No order details available.
              </p>
            ) : (
              <>
                <Separator />
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold flex items-center gap-2">
                      <Package className="h-5 w-5 text-primary" />
                      Order #{order._id}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Placed on {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Status: {order.paymentStatus}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Customer</h4>
                    <p className="text-sm text-muted-foreground">
                      Name: {order.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Email: {order.email}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Items</h4>
                    {order.products.map((item, index) => (
                      <div key={index} className="flex justify-between mt-2">
                        <div>
                          <p className="text-sm">{item.name}</p>
                          <p className="text-xs text-muted-foreground">
                            Qty: {item.quantity} @ ${item.price.toFixed(2)}
                          </p>
                        </div>
                        <p className="text-sm font-medium">
                          ${(item.quantity * item.price).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>${order.totalAmount.toFixed(2)}</span>
                  </div>
                </div>
              </>
            )}
            <div className="flex justify-center gap-4">
              <Button asChild>
                <Link href="/orders" className="text-white">
                  View All Orders
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/products">Continue Shopping</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
}
