"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { addTodo } from "@/features/todo/todoSlics";
import { useEffect } from "react";

interface IFormInput {
  productName: string;
  category: string;
}

const AddProduct = () => {
  const { register, handleSubmit } = useForm<IFormInput>();
  const router = useRouter();
  const dispatch = useDispatch();

  const categories = useSelector(
    (state: any) => state.categoryData.categories
  );


  useEffect(() => {
    console.log("Categories updated:", categories);
  }, [categories]);

  const onSubmit = (data: IFormInput) => {
    dispatch(addTodo(data));
    router.push("/");
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Add Product</h1>

      <form onSubmit={handleSubmit(onSubmit)}>

        <label htmlFor="productName">Product Name</label>
        <br />
        <input
          id="productName"
          {...register("productName", { required: true })}
        />
        <br /><br />

        <label htmlFor="category">Category</label>
        <br />
        <select {...register("category", { required: true })}>
          <option value="">-- Select Category --</option>
          {categories.map((c: any) => (
            <option key={c.id} value={c.categoryName}>
              {c.categoryName}
            </option>
          ))}
        </select>

        <br /><br />

        <button type="submit">Add Product</button> &nbsp;
        <button type="button" onClick={() => router.push("/")}>
          Exit
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
