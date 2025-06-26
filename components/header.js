"use client";
import { useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Package, ShoppingCart, User } from "lucide-react";
import { useCart } from "@/contexts/cart-context";
import { Badge } from "@/components/ui/badge";
export function Header() {
  const { getCartCount } = useCart();
  const { user, logout, loading } = useAuth();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const handleAuthClick = () => {
    if (loading) return;
    if (user) {
      router.push("/profile");
    } else {
      router.push("/login");
    }
  };
  if (loading) {
    return (
      <header className="bg-background border-b">
        <div className="container flex items-center justify-between py-4">
          <Link href="/" className="text-2xl font-bold">
            EasyCart
          </Link>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" disabled>
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Cart</span>
            </Button>
            <Button variant="ghost" size="icon" disabled>
              <User className="h-5 w-5" />
              <span className="sr-only">Account</span>
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden" disabled>
              <Menu className="h-5 w-5" />
              <span className="sr-only">Menu</span>
            </Button>
          </div>
        </div>
      </header>
    );
  }
  return (
    <header className="bg-background border-b">
      <div className="container flex items-center justify-between py-4">
        <Link href="/" className="text-2xl font-bold">
          EasyCart
        </Link>
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <Link
            href="/products"
            className="transition-colors hover:text-foreground/80"
          >
            Products
          </Link>
          <Link
            href="/categories"
            className="transition-colors hover:text-foreground/80"
          >
            Categories
          </Link>
          <Link
            href="/about"
            className="transition-colors hover:text-foreground/80"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="transition-colors hover:text-foreground/80"
          >
            Contact
          </Link>
          <Link
            href="/faq"
            className="transition-colors hover:text-foreground/80"
          >
            FAQ
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {getCartCount() > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs text-white">
                    {getCartCount()}
                  </Badge>
                )}
              </Button>
            </Link>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" onClick={handleAuthClick}>
                <User className="h-5 w-5" />
                <span className="sr-only">Account</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {user ? (
                <>
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="w-full">
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/orders" className="w-full">
                      Orders
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
                </>
              ) : (
                <DropdownMenuItem asChild>
                  <Link href="/login" className="w-full">
                    Login
                  </Link>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <nav className="flex flex-col space-y-4">
                <Link href="/products" onClick={() => setIsOpen(false)}>
                  Products
                </Link>
                <Link href="/categories" onClick={() => setIsOpen(false)}>
                  Categories
                </Link>
                <Link href="/about" onClick={() => setIsOpen(false)}>
                  About
                </Link>
                <Link href="/contact-us" onClick={() => setIsOpen(false)}>
                  Contact
                </Link>
                <Link href="/faq" onClick={() => setIsOpen(false)}>
                  FAQ
                </Link>
                {user ? (
                  <>
                    <Link href="/profile" onClick={() => setIsOpen(false)}>
                      Profile
                    </Link>
                    <Link href="/orders" onClick={() => setIsOpen(false)}>
                      Orders
                    </Link>
                    <Button
                      variant="outline"
                      onClick={() => {
                        logout();
                        setIsOpen(false);
                      }}
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <Link href="/login" onClick={() => setIsOpen(false)}>
                    Login
                  </Link>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
