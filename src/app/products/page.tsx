"use client";

import { useEffect, useState } from "react";
import { Products } from "../types/ProductType";
import api from "@/api/api";
import Link from "next/link";
import { Button, Card, CardContent, CardMedia, Typography } from "@mui/material";

interface ProductForm {
  id: string,
  title: string,
  price: number,
  category: string,
  thumbnail: string,
  description: string,
  stock: number,
}

const ListProducts = () => {
  const [products, setProducts] = useState<Products[]>([]);

  useEffect(() => {
    const localData = localStorage.getItem("allProducts");

    if (localData) {
      setProducts(JSON.parse(localData));
    } else {
      api.get("/products").then((res) => {
        const formatted: Products[] = res.data.products.map((item: ProductForm) => ({
          id: item.id.toString(),
          name: item.title,
          price: item.price,
          image: item.thumbnail,
          description: item.description,
          category: item.category || "",
          stock: item.stock || 0,
        }));
        setProducts(formatted);
        localStorage.setItem("allProducts", JSON.stringify(formatted));
      });
    }
  }, []);

  return (
  <div className="p-6">
    <div className="flex justify-between items-center mb-6">
    <Typography variant="h4">Product List</Typography>
    <Link href="/add-product">
      <Button variant="contained" color="primary">Add Product</Button>
    </Link>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    {products.map((product) => (
      <Link href={`/products/view/${product.id}`} key={product.id} className="h-full">
        <Card className="h-full flex flex-col justify-between shadow hover:shadow-lg transition-all duration-300">
          <CardMedia
            component="img"
            image={product.image}
            alt={product.name}
            style={{ height: 180, objectFit: 'contain', padding: '1rem' }}
          />
          <CardContent className="flex-grow flex flex-col justify-between">
            <Typography
              variant="h6"
              className="font-semibold text-gray-800 mb-2"
              style={{ minHeight: '3rem' }}
            >
              {product.name}
            </Typography>
            <Typography variant="body2" className="text-green-600 font-medium">
              ₹{product.price.toFixed(2)}
            </Typography>
          </CardContent>
        </Card>
      </Link>
    ))}

    {products.length === 0 && (
      <p className="col-span-full text-center text-gray-500">No products found.</p>
    )}
    </div>
  </div>
  );
};

export default ListProducts;

