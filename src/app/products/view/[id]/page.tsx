'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  CircularProgress,
} from '@mui/material';
import { motion } from 'framer-motion';
import { Products } from '@/app/types/ProductType';

const ViewProduct = () => {
  const params = useParams();
  const id = params?.id?.toString();
  const router = useRouter();

  const [product, setProduct] = useState<Products | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!id) return;

    const allProducts: Products[] = JSON.parse(localStorage.getItem("allProducts") || "[]");
    const foundProduct = allProducts.find((p) => p.id.toString() === id);

    if (foundProduct) {
      setProduct(foundProduct);
    } else {
      alert("Product not found.");
    }

    setLoading(false);
  }, [id]);

  const handleDelete = () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this product?');
    if (!confirmDelete || !id) return;

    setDeleting(true);

    const allProducts: Products[] = JSON.parse(localStorage.getItem("allProducts") || "[]");
    const updatedList = allProducts.filter((p) => p.id.toString() !== id);

    localStorage.setItem("allProducts", JSON.stringify(updatedList));
    alert("Product deleted!");
    router.push("/products");
  };

  return (
    <Box
      component="main"
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      bgcolor="#f4f6f8"
      px={2}
    >
      {loading ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: 'center' }}>
          <CircularProgress size={30} color="primary" />
          <Typography variant="body2" mt={2} color="text.secondary">
            Loading product...
          </Typography>
        </motion.div>
      ) : product ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{ width: '100%', maxWidth: 400 }}
        >
          <Card elevation={6} sx={{ borderRadius: 3, overflow: 'hidden', bgcolor: 'white' }}>
            <CardMedia
              component="img"
              height="200"
              image={product.image}
              alt={product.name}
              sx={{
                objectFit: 'cover',
                transition: 'transform 0.3s ease',
                '&:hover': { transform: 'scale(1.02)' },
              }}
            />
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={600} color="text.primary" gutterBottom>
                {product.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {product.description?.length > 100
                  ? product.description.slice(0, 100) + '...'
                  : product.description || 'No description available.'}
              </Typography>
              <Typography variant="h6" color="success.main" fontWeight={700}>
                ₹{product.price}
              </Typography>
            </CardContent>

            <Box px={3} pb={1}>
              <Button
                variant="outlined"
                color="error"
                onClick={handleDelete}
                fullWidth
                disabled={deleting}
              >
                {deleting ? 'Deleting...' : 'Delete Product'}
              </Button>
            </Box>

            <Box px={3} pb={3}>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => router.push(`/products/edit/${id}`)}
                fullWidth
              >
                Edit
              </Button>
            </Box>
          </Card>
        </motion.div>
      ) : (
        <Typography variant="h6" color="error">
          Product not found.
        </Typography>
      )}
    </Box>
  );
};

export default ViewProduct;
