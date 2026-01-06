'use client'

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useProducts } from "@/components/context/productContext";
import { Product } from "../constants/productData";

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
  const { products, updateProduct } = useProducts();

  const product = products.find(
    (item: Product) => item.id === productId
  );

  const { register, handleSubmit, reset } = useForm<FormValues>();

  useEffect(() => {
    if (product) {
      reset({
        id: product.id,
        productName: product.productName,
        category: product.category,
      });
    }
  }, [product, reset]);

  if (!product) {
    return <h1>Product does not exist.</h1>;
  }

  const onSubmit = (data: FormValues) => {
    updateProduct(data);
    console.log(data);
    router.push("/");
  };

  return (
    <div>
      <h1>Update Product Details:</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="id">Product Id</label>
        <br />
        <input
          id="id"
          readOnly
          {...register("id")}
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

        <button type="submit">Update</button>
        &nbsp;
        <button
          type="button"
          onClick={() => router.push("/")}
        >
          Exit
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;
