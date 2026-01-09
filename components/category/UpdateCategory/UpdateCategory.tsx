'use client';

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { updateCategory } from "@/features/category/categoryReducer";

interface ProductProps {
  categoryId: string;
}

interface FormValues {
  id: string;
  productName: string;
  category: string;
}

const UpdateCategory = ({ categoryId }: ProductProps) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { register, handleSubmit, reset } = useForm<FormValues>();

  const category = useSelector((state: any) =>
    state.categoryData.categories?.find((c: any) => String(c.id) === categoryId)
  );

  useEffect(() => {
    if (category) {
      reset({
        id: category.id,
        categoryName: category.categoryName,
      });
    }
  }, [category, reset]);

  const onSubmit = (data: FormValues) => {
    dispatch(updateCategory(data));
    router.push("/CategoryPage");
  };
  
  if (!category) return <h1>Product not found</h1>;

  return (
    <div>
      <h1>Update Product Details</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Category Id</label>
        <br />
        <input readOnly {...register("id")} />
        <br /><br />

        <label>Category Name</label>
        <br />
        <input {...register("categoryName", { required: true })} />
        <br /><br />

        <button type="submit">Update</button>
        &nbsp;
        <button type="button" onClick={() => router.push("/CategoryPage")}>
          Exit
        </button>
      </form>
    </div>
  );
};

export default UpdateCategory;
