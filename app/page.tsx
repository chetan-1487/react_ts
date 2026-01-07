// without use-client it will show an error:
// "You're importing a component that needs `useState`. This React Hook only works in a Client Component. To fix, mark the file (or its parent) with the "use client" directive."

"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
// in the useSelector we have the access of the state

import { removeTodo, searchTodo } from "@/features/todo/todoSlics";



export async function getData() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
    cache: 'no-store', // or 'force-cache'
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}





export default function Home() {
  const router = useRouter();
  const todos = useSelector((state: any) => state.todos);
  const dispatch = useDispatch();

  return (
    <>
      <h1 style={{textAlign:"center", textDecoration:"underline"}}>Products</h1>

      <button style={{backgroundColor:"green"}} onClick={()=>{router.push("/pages/add")}}>Add New Product</button>

      <br/><br/>
      <label htmlFor="search">Search Product </label>
      <textarea placeholder="Search Products" onChange={(e) => {
          dispatch(searchTodo(e.target.value))}}
          id="search"
      />
      <br/><br/>

      <table style={{ border:"1px solid black"}}>
        <thead>
          <tr>
            <td style={{ border: "1px solid black", padding: "8px" }}>
              <b>ProductId</b>
            </td>
            <td style={{ border: "1px solid black", padding: "8px" }}>
              <b>ProductName</b>
            </td>
            <td style={{ border: "1px solid black", padding: "8px" }}>
              <b>Category</b>
            </td>
            <td style={{ border: "1px solid black", padding: "8px" }}>
              <b>Actions</b>
            </td>
          </tr>
        </thead>
        <tbody>
          {todos.map((product: any) => (
            <tr key={product.id}>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                {product.id}
              </td>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                {product.productName}
              </td>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                {product.category}
              </td>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                <button
                  onClick={() => {
                    router.push(`/pages/update/${product.id}`);
                  }}
                  style={{ backgroundColor: "yellow" }}
                >
                  Update
                </button>

                <button
                  style={{ backgroundColor: "red" }}
                  onClick={() => {
                    dispatch(removeTodo(product.id));
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
