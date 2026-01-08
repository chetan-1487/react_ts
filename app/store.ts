"use client";

import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../features/todo/todoSlics";
import categoryReducer  from "@/features/category/categoryReducer";

//redux-toolkit  -->  redux ka engine h actually me redux logic handle karta h.
// 1) Store banate hain
// 2) Slice banate hain
// 3) Reducers likhte hain
// 4) Actions create karte hain

// react-redux  -->  react ko redux se connect karta h
// redux store ko react app se jodta h
// component ko state and dispatch deta h

//store is the global state

export const store = configureStore({
  reducer:{
    todoData: todoReducer,
    categoryData: categoryReducer,
  }
});






// dispatch used the reducers to change the value of the store..