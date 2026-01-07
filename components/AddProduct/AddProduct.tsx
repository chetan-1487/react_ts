"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useDispatch} from "react-redux";
import { addTodo } from "@/features/todo/todoSlics";

interface IFormInput {
  productId: string;
  productName: string;
  category: string;
}

const AddProduct = () => {
  const { register, handleSubmit } = useForm<IFormInput>();
  const router = useRouter();

  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  const onSubmit = (data: IFormInput) => {
    dispatch(addTodo(data));
    setInput("");
    router.push("/")
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Add products</h1>
      <br />
      <br />

      <form onSubmit={handleSubmit(onSubmit)}>
        <br />
        <br />

        <label htmlFor="productName">Product Name</label>
        <br />
        <input
          id="productName"
          {...register("productName", { required: true })}
        />
        <br />
        <br />

        <label htmlFor="category">Category</label>
        <br />
        <input id="category" {...register("category", { required: true })} />
        <br />
        <br />

        <button type="submit">Add new Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
