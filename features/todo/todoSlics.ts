// slice = state + reducers + actions
// slice is the advanced version of the reducers(functionality)
"use client";

import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  todos: [
    {
      id: "P1",
      productName: "Cars",
      category: "Children Toys",
    },
    {
      id: "P2",
      productName: "Cricket",
      category: "Sports",
    },
    {
      id: "P3",
      productName: "Football",
      category: "Sports",
    },
  ],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    //state: give access of all data
    //actions: give what data remove and delete means it gives id
    addTodo: (state, actions) => {
      const todo: any = {
        id: nanoid(),
        productName: actions.payload.productName,
        category: actions.payload.category,
      };
      state.todos.push(todo);
    },
    removeTodo: (state, actions) => {
      console.log(actions.payload)
      state.todos = state.todos.filter((todo) => todo.id !== actions.payload);
    },
    searchTodo:(state,actions) =>{
      state.todos = state.todos.filter((p:any) => p.productName.toLowerCase().includes(actions.payload.toLowerCase()))
    },
    updateTodo: (state, action) => {
      const { id, productName, category } = action.payload;

      const todo = state.todos.find((t) => t.id === id);
      if (todo) {
        todo.productName = productName;
        todo.category = category;
      }

      const filteredTodo = state.todos.find((t) => t.id === id);
      if (filteredTodo) {
        filteredTodo.productName = productName;
        filteredTodo.category = category;
      }
    },
  },
});

export const { addTodo, removeTodo, searchTodo, updateTodo } = todoSlice.actions;
export default todoSlice.reducer;
