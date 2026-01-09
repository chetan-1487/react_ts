"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useDispatch} from "react-redux";
import { addCategory } from "@/features/category/categoryReducer";

interface IFormInput {
  Id: string;
  categoryName: string;
}

const AddCateg = () => {
  const { register, handleSubmit } = useForm<IFormInput>();
  const router = useRouter();

  const dispatch = useDispatch();

  const onSubmit = (data: IFormInput) => {
    dispatch(addCategory(data.categoryName));;
    router.push("/CategoryPage")
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Add Category</h1>
      <br />
      <br />

      <form onSubmit={handleSubmit(onSubmit)}>
        <br />
        <br />

        <label htmlFor="categoryName">New Category</label>
        <br />
        <input id="categoryName" {...register("categoryName", { required: true })} />
        <br />
        <br />

        <button type="submit">Add new Category</button> &nbsp;&nbsp;
        <button onClick={()=>router.push("/CategoryPage")}>Exit</button>
      </form>
    </div>
  );
};

export default AddCateg;
