// without use-client it will show an error:
// "You're importing a component that needs `useState`. This React Hook only works in a Client Component. To fix, mark the file (or its parent) with the "use client" directive."


'use client'

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useProducts } from "@/components/context/productContext";


export default function Home() {

  const router = useRouter();

  const { products, setProducts } = useProducts();

  const [search, setSearch] = useState("")

  const filteredProducts = useMemo(()=>{
    return products.filter((p:any) => p.productName.toLowerCase().includes(search.toLowerCase())
  );
  },[products, search]) 

  function deleteProduct(id: string){
    setProducts(products.filter((product:any)=>product.id!==id))
  }

  return (
    <>
      <h1 style={{textAlign:"center", textDecoration:"underline"}}>Products</h1>

      <button style={{backgroundColor:"green"}} onClick={()=>{router.push("/pages/add")}}>Add New Product</button>

      <br/><br/>
      <label htmlFor="search">Search Product </label>
      <textarea placeholder="Search Products" onChange={(e) => setSearch(e.target.value)} id="Search" />
      <br/><br/>

      <table style={{border:"1px solid black", borderCollapse: "collapse"}}>
        <thead>
          <tr>
            <td style={{ border: "1px solid black", padding: "8px" }}><b>ProductId</b></td>
            <td style={{ border: "1px solid black", padding: "8px" }}><b>ProductName</b></td>
            <td style={{ border: "1px solid black", padding: "8px" }}><b>Category</b></td>
            <td style={{ border: "1px solid black", padding: "8px" }}><b>Actions</b></td>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product:any)=>(
            <tr  key={product.id}>
              <td style={{ border: "1px solid black", padding: "8px" }}>{product.id}</td>
              <td style={{ border: "1px solid black", padding: "8px" }}>{product.productName}</td>
              <td style={{ border: "1px solid black", padding: "8px" }}>{product.category}</td>
              <td style={{ border: "1px solid black", padding: "8px" }}>
              <button onClick={()=>{
                router.push(`/pages/update/${product.id}`)
              }} style={{backgroundColor:"yellow"}}>Update</button>

              <button style={{backgroundColor:"red"}} onClick={()=>{
                deleteProduct(product.id);
              }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
