"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import toast from "react-hot-toast";
export default function OrdersPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!user) {
      toast.error("Please log in to view your orders.");

      router.push("/login");
      return;
    }
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          `http://localhost:3009/orders/getAllOrdersByEmail?email=${user.email}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch orders");
        }
        setOrders(data.orders);
      } catch (error) {
        toast.error("Failed to load orders. Try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [user, toast, router]);
  if (!user) {
    return null;
  }
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container py-16">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tighter">Your Orders</h1>
          <p className="text-muted-foreground mt-2">
            View your order history with EasyCart
          </p>
        </div>
        {loading ? (
          <div className="text-center">
            <p className="text-muted-foreground">Loading orders...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">No orders found</h2>
            <p className="text-muted-foreground mb-8">
              You haven't placed any orders yet.
            </p>
            <Button asChild>
              <Link href="/products" className="text-white">
                Shop Now
              </Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <Card key={order._id}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5 text-primary" />
                    Order #{order._id}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Placed on {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Status: {order.paymentStatus}
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
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
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
