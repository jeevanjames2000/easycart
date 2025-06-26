"use client";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { User2, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";
export default function ProfilePage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!user) {
      toast.error("Please log in to view your profile.");
      router.push("/login");
    }
  }, [user, router, toast]);
  if (!user) {
    return null;
  }
  const handleLogout = () => {
    logout();

    toast.success("You have been successfully logged out.");
    router.push("/login");
  };
  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-16">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Your Profile</CardTitle>
          <CardDescription>Manage your account details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-2">
                <User2 className="h-4 w-4 text-muted-foreground" />
                Name
              </Label>
              <Input
                id="name"
                value={user.name || "N/A"}
                readOnly
                className="bg-muted/50 cursor-default"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                Email
              </Label>
              <Input
                id="email"
                value={user.email || "N/A"}
                readOnly
                className="bg-muted/50 cursor-default"
              />
            </div>
          </div>
          <Separator />
          <div className="flex flex-col gap-4">
            <Button
              variant="outline"
              asChild
              className="w-full hover:bg-accent hover:text-accent-foreground"
            >
              <Link href="/profile/edit">Edit Profile</Link>
            </Button>
            <Button
              variant="outline"
              asChild
              className="w-full hover:bg-accent hover:text-accent-foreground"
            >
              <Link href="/orders">View Orders</Link>
            </Button>
            <Button variant="outline" onClick={handleLogout} className="w-full">
              Log Out
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
