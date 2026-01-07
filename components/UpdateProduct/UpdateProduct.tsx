'use client';

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { updateTodo } from "@/features/todo/todoSlics";

interface ProductProps {
  productId: string;
}

interface FormValues {
  id: string;
  productName: string;
  category: string;
}

const UpdateProduct = ({ productId }: ProductProps) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { register, handleSubmit, reset } = useForm<FormValues>();

  const product = useSelector((state: any) =>
    state.todos?.find((p: any) => String(p.id) === productId)
  );

  useEffect(() => {
    if (product) {
      reset({
        id: product.id,
        productName: product.productName,
        category: product.category,
      });
    }
  }, [product, reset]);

  const onSubmit = (data: FormValues) => {
    dispatch(updateTodo(data));
    router.push("/");
  };
  
  if (!product) return <h1>Product not found</h1>;

  return (
    <div>
      <h1>Update Product Details</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Product Id</label>
        <br />
        <input readOnly {...register("id")} />
        <br /><br />

        <label>Product Name</label>
        <br />
        <input {...register("productName", { required: true })} />
        <br /><br />

        <label>Category</label>
        <br />
        <input {...register("category", { required: true })} />
        <br /><br />

        <button type="submit">Update</button>
        &nbsp;
        <button type="button" onClick={() => router.push("/")}>
          Exit
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;
