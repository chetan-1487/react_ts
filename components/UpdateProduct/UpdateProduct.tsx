import React from "react";
import { Product } from "../constants/productData";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useProducts } from "@/components/context/productContext";

interface ProductProps {
  productData: Product[];
  productId: string;
}

const UpdateProduct = ({ productId }: ProductProps) => {

  const router = useRouter();
  const {products, updateProduct} = useProducts()

  const product = products.find(
    (item: any) => item.id === productId
  );

  const [formData, setFormData] = useState({
    id:"",
    productName: "",
    category: "",
  });

  if (!formData) {
    return <h1>Product does not exist.</h1>;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    updateProduct(formData);
    console.log(formData)
    router.push("/");
  }

  useEffect(() => {
    if (product) {
      setFormData({
        id: product.id,
        productName: product.productName,
        category: product.category,
      });
    }
  }, [product]);

  function handleChange(event: any) {
    console.log(event.target.value)
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }

  return (
    <div>
      <h1>Update Product Details:</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="productId">Product Id </label>
        <input
          placeholder="ProductId"
          value={formData.id}
          id="productId"
          readOnly
        />
      <br/><br/>
        <label htmlFor="productName" >Product Name </label>
        <input
          placeholder="ProductName"
          value={formData.productName}
          onChange={handleChange}
          name="productName"
          id="productName"
        />
      <br/><br/>
        <label htmlFor="category">Category </label>
        <input
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          name="category"
          id="category"
        />
      <br/><br/>

        <button type="submit">Update</button>
        &nbsp;
        <button type="button" onClick={() => {
          router.push("/")
        }}>Exit</button>
      </form>
    </div>
  );
};

export default UpdateProduct;
