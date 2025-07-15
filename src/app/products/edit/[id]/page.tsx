"use client";

import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { Products } from "@/app/types/ProductType";

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  price: yup
    .number()
    .typeError("Price must be a number")
    .positive("Price must be positive")
    .required("Price is required"),
  description: yup.string().required("Description is required"),
  thumbnail: yup.string().required("Image is required"),
});

const UpdateProduct = () => {
  const params = useParams();
  const id = params?.id?.toString();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  useEffect(() => {
    if (!id) return;
    const allProducts: Products[] = JSON.parse(localStorage.getItem("allProducts") || "[]");
    const product = allProducts.find((p) => p.id.toString() === id);
    if (product) {
      setValue("title", product.name);
      setValue("price", product.price);
      setValue("description", product.description);
      setValue("thumbnail", product.image);
    } else {
      alert("Product not found!");
      router.push("/products");
    }
  }, [id, setValue, router]);

  const onSubmit = (data: any) => {
    const allProducts: Products[] = JSON.parse(localStorage.getItem("allProducts") || "[]");
    const updatedList = allProducts.map((p) =>
      p.id.toString() === id
        ? { ...p, name: data.title, price: data.price, description: data.description, image: data.thumbnail }
        : p
    );
    localStorage.setItem("allProducts", JSON.stringify(updatedList));
    alert("Product updated!");
    router.push("/products");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow space-y-5">
      <h2 className="text-2xl font-bold text-center">Update Product</h2>
      <div>
        <label>Title</label>
        <input type="text" {...register("title")} className="w-full border rounded p-2" />
        <p className="text-red-500 text-sm">{errors.title?.message}</p>
      </div>
      <div>
        <label>Price</label>
        <input type="number" {...register("price")} className="w-full border rounded p-2" />
        <p className="text-red-500 text-sm">{errors.price?.message}</p>
      </div>
      <div>
        <label>Description</label>
        <textarea {...register("description")} className="w-full border rounded p-2" />
        <p className="text-red-500 text-sm">{errors.description?.message}</p>
      </div>
      <div>
        <label>Image URL</label>
        <input type="text" {...register("thumbnail")} className="w-full border rounded p-2" />
        <p className="text-red-500 text-sm">{errors.thumbnail?.message}</p>
      </div>
      <button className="w-full bg-blue-600 text-white py-2 rounded">Update</button>
    </form>
  );
};

export default UpdateProduct;
