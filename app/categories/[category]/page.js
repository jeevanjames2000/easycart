// app/categories/[category]/page.js
"use client";
import { useState, useEffect } from "react";
import { use } from "react";
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
import Link from "next/link";

const validCategories = [
  "electronics",
  "jewelery",
  "men's clothing",
  "women's clothing",
];

const categoryMapping = {
  accessories: ["jewelery"],
  clothing: ["men's clothing", "women's clothing"],
  electronics: ["electronics"],
};

async function fetchProducts(categories) {
  try {
    const fetchPromises = categories.map((category) =>
      fetch(
        `https://fakestoreapi.com/products/category/${category.toLowerCase()}`
      )
        .then((res) => {
          if (!res.ok) throw new Error(`Failed to fetch ${category}`);
          return res.json();
        })
        .then((products) =>
          products.map((product) => ({
            id: `${product.id}`,
            name: product.title,
            price: Math.round(product.price),
            originalPrice: Math.round(product.price * 1.3),
            image: product.image,
            category:
              product.category.charAt(0).toUpperCase() +
              product.category.slice(1),
            sale: product.price < 100,
            rating: product.rating.rate,
          }))
        )
    );
    const productsArrays = await Promise.all(fetchPromises);
    return productsArrays.flat();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default function CategoryPage({ params: paramsPromise }) {
  const params = use(paramsPromise);

  const [allProducts, setAllProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
  const [sortBy, setSortBy] = useState("name");
  const [showOnSale, setShowOnSale] = useState(false);
  const [isValidCategory, setIsValidCategory] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const categoryName = params.category
    ? params.category
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    : "";

  useEffect(() => {
    async function loadProducts() {
      setIsLoading(true);
      const normalizedCategory = params.category
        ? params.category.toLowerCase().replace("-", " ")
        : "";

      const apiCategories = categoryMapping[normalizedCategory] || [
        normalizedCategory,
      ];

      if (
        apiCategories.every((cat) => validCategories.includes(cat)) ||
        normalizedCategory === "accessories" ||
        normalizedCategory === "clothing"
      ) {
        setIsValidCategory(true);
        const products = await fetchProducts(apiCategories);
        setAllProducts(products);
      } else {
        setIsValidCategory(false);
        setAllProducts([]);
      }
      setIsLoading(false);
    }

    loadProducts();
  }, [params.category]);

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
    const matchesPriceRange =
      selectedPriceRanges.length === 0 ||
      selectedPriceRanges.some(
        (range) => product.price >= range.min && product.price <= range.max
      );
    const matchesSale = !showOnSale || product.sale;
    return matchesSearch && matchesPriceRange && matchesSale;
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

  if (!isValidCategory) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container py-12">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl text-black">
            {categoryName}
          </h1>
          <p className="mt-6 text-gray-600">
            Sorry, the category "{category}" is not available.
          </p>
          <Link href="/products">
            <Button className="mt-4 bg-black text-white hover:bg-gray-800">
              Browse All Products
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <Header />
      <div className="container py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-black">
            {categoryName}
          </h2>
          <p className="mt-2 text-gray-600">
            Browse our collection of {categoryName.toLowerCase()} products
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          <div className="space-y-6">
            <Card className="bg-white border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-black">
                  <Filter className="h-4 w-4 text-gray-500" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-black">
                    Search
                  </label>
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      placeholder="Search products..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8 bg-gray-100 text-black border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-black">
                    Price Range
                  </label>
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
                          className="border-gray-400 text-blue-500"
                        />
                        <label
                          htmlFor={range.label}
                          className={`text-sm font-medium ${
                            selectedPriceRanges.some(
                              (r) => r.label === range.label
                            )
                              ? "font-bold text-black"
                              : "text-gray-500"
                          }
                            }`}
                        >
                          {range.label}
                        </label>
                      </div>
                    ))}
                    {selectedPriceRanges.length > 0 && (
                      <div className="text-sm text-gray-500">
                        Selected:{" "}
                        {selectedPriceRanges.map((r) => r.label).join(", ")}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="on-sale"
                    checked={showOnSale}
                    onCheckedChange={setShowOnSale}
                    className="border-gray-400 text-blue-500"
                  />
                  <label
                    htmlFor="on-sale"
                    className={`text-sm font-medium ${
                      showOnSale ? "font-bold text-black" : "text-gray-500"
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
              <p className="text-sm text-gray-600">
                Showing {sortedProducts.length} of {allProducts.length} products
              </p>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px] bg-gray-100 text-black border-gray-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white text-black border-gray-200">
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
                    Rating: Highest
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            {isLoading ? (
              <div className="text-center py-12 text-gray-600">Loading...</div>
            ) : sortedProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600">
                  No products found for this category.
                </p>
                <Button
                  variant="outline"
                  className="mt-4 border-gray-300 text-black hover:bg-gray-100"
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedPriceRanges([]);
                    setShowOnSale(false);
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {sortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
