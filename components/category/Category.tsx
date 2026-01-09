import React from 'react'
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { removeCategory, updateCategory } from '@/features/category/categoryReducer';
import { UseDispatch } from 'react-redux';

const Category = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const categories = useSelector(
    (state: any) => state.categoryData.categories
  );

  return (
    <div style={{ backgroundColor: "skyblue", minHeight: "100vh" }}>
      <h1>Welcome</h1>
      <button onClick={() => router.push("/AddCategory")}>Add Category</button>
      <ul>
        {categories.map((c: any) => (
          <li key={c.id}>{c.categoryName} &nbsp;&nbsp; 
            <button onClick={()=>router.push(`/updateCategory/${c.id}`)}> Update </button>&nbsp;&nbsp;
            <button onClick={()=>dispatch(removeCategory(c.id))}> Delete</button>&nbsp;&nbsp;
            <br/>
          </li>
        ))
        }
      </ul>
      <button onClick={()=>router.push("/")}>Go to Home page</button>
    </div>
);
}

export default Category;
