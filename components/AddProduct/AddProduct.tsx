
'use client'

import { useState } from "react";
import React from "react";
import { useProducts } from "../context/productContext";
import { useRouter } from "next/navigation";

const AddProduct = () => {

  const router = useRouter();

  const { products, setProducts } = useProducts();

  const [Add, setAdd] = useState({
    id:"",
    productName:"",
    category:""
  });

  let handleSubmit = (event: React.FormEvent) =>{
    event.preventDefault();
    setProducts((prev: any) => [...prev, Add]);
    router.push("/")
  }

  
  return (
    <div>
      <h1 style={{textAlign:"center"}}>Add products</h1>
      <br/><br/>
      <form onSubmit={handleSubmit}>
        <label htmlFor='productId'>Product Id </label>
        <input placeholder='productId' id='productId' onChange={(e) => setAdd({ ...Add, id: e.target.value })}/>
        <br/><br/>
        <label htmlFor='productName'>Product Name </label>
        <input placeholder='productName' id='productName' onChange={(e)=>setAdd({...Add, productName:e.target.value})} />
        <br/><br/>
        <label htmlFor='category'>Category </label>
        <input placeholder='category' id='category' onChange={(e)=>setAdd({...Add, category:e.target.value})}/>
        <br/><br/>
        <button >Add new Product</button>
      </form>
    </div>
  )
}

export default AddProduct;
