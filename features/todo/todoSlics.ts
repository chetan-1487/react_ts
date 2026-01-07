// slice = state + reducers + actions
// slice is the advanced version of the reducers(functionality)
"use client";

import { createSlice, nanoid } from "@reduxjs/toolkit";
import { getData } from "@/app/page";

async function name() {
  let data=await getData();
  return data.products;
}

let data =await name();

const initialState = {
  todos: data.map((product: any) => ({
    id: product.id,
    productName: product.title,
    category: product.category,
  })),
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    //reducers help to update the state
    //state: give access of all data
    //actions: give what data remove and delete means it gives id
    addTodo: (state, action) => {
      //actions plain object that describing what happened
      const todo: any = {
        id: nanoid(),
        productName: action.payload.productName,
        category: action.payload.category,
      };
      state.todos.push(todo);
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter((todo: any) => todo.id !== action.payload);
    },
    searchTodo:(state,action) =>{
      state.todos = state.todos.filter((p:any) => p.productName.toLowerCase().includes(action.payload.toLowerCase()))
    },
    updateTodo: (state, action) => {
      const { id, productName, category } = action.payload;

      const todo = state.todos.find((t: any) => t.id === id);
      if (todo) {
        todo.productName = productName;
        todo.category = category;
      }

      const filteredTodo = state.todos.find((t: any) => t.id === id);
      if (filteredTodo) {
        filteredTodo.productName = productName;
        filteredTodo.category = category;
      }
    },
  },
});

export const { addTodo, removeTodo, searchTodo, updateTodo } = todoSlice.actions;
export default todoSlice.reducer;
