"use client"
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Products } from '../types/ProductType';

const schema = yup.object().shape({
  title: yup.string().required('Title is required'),
  price: yup
    .number()
    .typeError('Price must be a number')
    .positive('Price must be positive')
    .required('Price is required'),
  description: yup.string().required('Description is required'),
  thumbnail: yup.string().required('Image is required'),
});

interface ProductForm {
  title: string,
  price: number,
  thumbnail: string,
  description: string,
}


const AddProduct = () => {
  const router = useRouter();

  const { register, handleSubmit, formState: {errors}, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: ProductForm) => {
    const newProduct : Products = {
      id: `local-${Date.now()}`,
      name: data.title,
      price: data.price,
      image: data.thumbnail,
      category: 'General',
      description: data.description,
      stock: 0,
    };

    const all = localStorage.getItem('allProducts');
    const updated = all ? [newProduct, ...JSON.parse(all)] : [newProduct];
    localStorage.setItem('allProducts', JSON.stringify(updated));

    reset();
    alert('Product added successfully!');
    router.push('/Products');
  };


  return(
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 flex justify-center items-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-8"
      >
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Add New Product
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block mb-1 font-medium text-gray-700">Product Title</label>
            <input
              type="text"
              {...register('title')}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.title ? 'border-red-500 ring-red-100' : 'border-gray-300 focus:ring-blue-200'}`}
            />
            {errors.title && <p className="text-sm text-red-500 mt-1">{errors.title.message}</p>}
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Description</label>
            <textarea
              rows={3}
              {...register('description')}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.description ? 'border-red-500 ring-red-100' : 'border-gray-300 focus:ring-blue-200'}`}
            />
            {errors.description && <p className="text-sm text-red-500 mt-1">{errors.description.message}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium text-gray-700">Price (₹)</label>
              <input
                type="number"
                {...register('price')}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.price ? 'border-red-500 ring-red-100' : 'border-gray-300 focus:ring-blue-200'}`}
              />
              {errors.price && <p className="text-sm text-red-500 mt-1">{errors.price.message}</p>}
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">Image URL</label>
              <input
                type="text"
                {...register('thumbnail')}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.thumbnail ? 'border-red-500 ring-red-100' : 'border-gray-300 focus:ring-blue-200'}`}
              />
              {errors.thumbnail && <p className="text-sm text-red-500 mt-1">{errors.thumbnail.message}</p>}
            </div>
          </div>

          <motion.button
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-all"
          >
            Add Product
          </motion.button>
        </form>
      </motion.div>
    </div>
  )
}

export default AddProduct
