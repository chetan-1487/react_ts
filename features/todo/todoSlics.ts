// slice = state + reducers + actions
// slice is the advanced version of the reducers(functionality)
"use client";

import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import { Product } from "@/components/constants/productData";


export const fetchTodos = createAsyncThunk(
  "todo/fetchTodos",
  async () => {
    const res = await fetch("https://dummyjson.com/products");
    const data = await res.json();
    return data.products;
  }
);

const initialState = {
  todos:[]
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload.map((p:any) => ({
          id: nanoid(),
          productName: p.title,
          category: p.category,
        }));
        // state.allTodos = state.todos;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { addTodo, removeTodo, searchTodo, updateTodo } = todoSlice.actions;
export default todoSlice.reducer;
