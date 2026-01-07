"use client";
import { createContext, useContext, useState } from "react";
import { data, Product } from "@/components/constants/productData";

//createContext() global store data bnata h
const ProductContext = createContext<any>(null);

export function ProductProvider({ children }: any) {
  const [products, setProducts] = useState<Product[]>(data);

  const updateProduct = (updatedProduct: any) => {
    setProducts(prev =>
      prev.map(product =>
        product.id === updatedProduct.id
          ? updatedProduct
          : product
      )
    );
  };


  return (
    <ProductContext.Provider
      value={{ products, updateProduct ,setProducts }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export const useProducts = () => useContext(ProductContext);
// useContext() hume global data share karne deta h bina props pass kiye..