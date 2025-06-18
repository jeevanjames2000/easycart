"use client";
import { useState, useEffect } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Filter, Search } from "lucide-react";

async function fetchProducts() {
  try {
    const res = await fetch("https://fakestoreapi.com/products");
    if (!res.ok) throw new Error("Failed to fetch products");
    const products = await res.json();
    return products.map((product) => ({
      id: product.id,
      name: product.title,
      price: Math.round(product.price),
      originalPrice: Math.round(product.price * 1.3),
      image: product.image,
      category:
        product.category.charAt(0).toUpperCase() + product.category.slice(1),
      sale: product.price < 100,
      rating: product.rating.rate,
    }));
  } catch (error) {
    console.error(error);
    return [
      {
        id: 1,
        name: "Premium Wireless Headphones",
        price: 299,
        originalPrice: 399,
        image: "/placeholder.svg?height=400&width=400",
        category: "Electronics",
        sale: true,
        rating: 4.5,
      },
    ];
  }
}

export default function ProductsPage() {
  const [allProducts, setAllProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
  const [sortBy, setSortBy] = useState("name");
  const [showOnSale, setShowOnSale] = useState(false);
  const [categories, setCategories] = useState(["All"]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch("https://fakestoreapi.com/products/categories");
        if (!res.ok) throw new Error("Failed to fetch categories");
        const data = await res.json();
        const formattedCategories = [
          "All",
          ...data.map((cat) => cat.charAt(0).toUpperCase() + cat.slice(1)),
        ];
        setCategories(formattedCategories);
      } catch (error) {
        console.error(error);
        setCategories(["All", "Electronics", "Clothing", "Accessories"]);
      }
    }
    fetchCategories();
  }, []);

  useEffect(() => {
    async function loadProducts() {
      const products = await fetchProducts();
      setAllProducts(products);
    }
    loadProducts();
  }, []);

  const priceRanges = [
    { label: "Under $50", min: 0, max: 50 },
    { label: "$50 - $100", min: 50, max: 100 },
    { label: "$100 - $200", min: 100, max: 200 },
    { label: "Over $200", min: 200, max: Number.POSITIVE_INFINITY },
  ];

  const filteredProducts = allProducts.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    const matchesPriceRange =
      selectedPriceRanges.length === 0 ||
      selectedPriceRanges.some(
        (range) => product.price >= range.min && product.price <= range.max
      );
    const matchesSale = !showOnSale || product.sale;
    return matchesSearch && matchesCategory && matchesPriceRange && matchesSale;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      default:
        return a.name.localeCompare(b.name);
    }
  });

  const handlePriceRangeChange = (range, checked) => {
    setSelectedPriceRanges((prev) =>
      checked ? [...prev, range] : prev.filter((r) => r.label !== range.label)
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">
            All Products
          </h1>
          <p className="mt-2 text-muted-foreground">
            Discover our complete collection of premium products
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Search</label>
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search products..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <Select
                    value={selectedCategory}
                    onValueChange={setSelectedCategory}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      {categories.map((category) => (
                        <SelectItem
                          key={category}
                          value={category}
                          className="text-left"
                        >
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Price Range</label>
                  <div className="space-y-2">
                    {priceRanges.map((range) => (
                      <div
                        key={range.label}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={range.label}
                          checked={selectedPriceRanges.some(
                            (r) => r.label === range.label
                          )}
                          onCheckedChange={(checked) =>
                            handlePriceRangeChange(range, checked)
                          }
                        />
                        <label
                          htmlFor={range.label}
                          className={`text-sm ${
                            selectedPriceRanges.some(
                              (r) => r.label === range.label
                            )
                              ? "font-bold text-primary"
                              : ""
                          }`}
                        >
                          {range.label}
                        </label>
                      </div>
                    ))}
                  </div>
                  {selectedPriceRanges.length > 0 && (
                    <div className="text-sm text-muted-foreground">
                      Selected:{" "}
                      {selectedPriceRanges.map((r) => r.label).join(", ")}
                    </div>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="on-sale"
                    checked={showOnSale}
                    onCheckedChange={setShowOnSale}
                  />
                  <label
                    htmlFor="on-sale"
                    className={`text-sm font-medium ${
                      showOnSale ? "font-bold text-primary" : ""
                    }`}
                  >
                    On Sale Only
                  </label>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-3">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Showing {sortedProducts.length} of {allProducts.length} products
              </p>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="name" className="text-left">
                    Name A-Z
                  </SelectItem>
                  <SelectItem value="price-low" className="text-left">
                    Price: Low to High
                  </SelectItem>
                  <SelectItem value="price-high" className="text-left">
                    Price: High to Low
                  </SelectItem>
                  <SelectItem value="rating" className="text-left">
                    Highest Rated
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            {sortedProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  No products found matching your criteria.
                </p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("All");
                    setSelectedPriceRanges([]);
                    setShowOnSale(false);
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
