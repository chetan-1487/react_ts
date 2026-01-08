import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {}
]

export const categoryReducer = createSlice({
  name:"category",
  initialState,
  reducers:{
    selectCategory: (state, action) => {

    }
  }
})

export default categoryReducer.reducer;
export const {selectCategory} = categoryReducer.actions;