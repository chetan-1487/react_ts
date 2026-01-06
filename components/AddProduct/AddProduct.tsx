'use client'

import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useProducts } from "../context/productContext";

interface IFormInput {
  productId: string;
  productName: string;
  category: string;
}

const AddProduct = () => {
  const { register, handleSubmit } = useForm<IFormInput>();
  const { setProducts } = useProducts();
  const router = useRouter();

  const onSubmit = (data: IFormInput) => {
    console.log(data)
    const newProduct = {
    ...data,
    id: data.productId,
  };
    setProducts((prev: any) => [...prev, newProduct]);
    router.push("/");
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Add products</h1>
      <br /><br />

      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="productId">Product Id</label>
        <br />
        <input
          id="productId"
          {...register("productId", { required: true, maxLength: 20 })}
        />
        <br /><br />

        <label htmlFor="productName">Product Name</label>
        <br />
        <input
          id="productName"
          {...register("productName", { required: true })}
        />
        <br /><br />

        <label htmlFor="category">Category</label>
        <br />
        <input
          id="category"
          {...register("category", { required: true })}
        />
        <br /><br />

        <button type="submit">Add new Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
