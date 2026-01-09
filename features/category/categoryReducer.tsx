import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  categories: [
    {id:1, categoryName: "Beauty" },
    {id:2, categoryName: "fragrances" },
    {id:3, categoryName: "furniture"}
  ],
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    addCategory: (state, action) => {
      const category = {
        id: nanoid(),
        categoryName: action.payload,
      };
      state.categories.push(category);
    },

    removeCategory: (state, action) => {
      state.categories = state.categories.filter(
        (c) => c.id !== action.payload
      );
      state.categories = state.categories.filter(
        (c) => c.id !== action.payload
      );
    },

    searchCategory: (state, action) => {
      const query = action.payload.toLowerCase();

      state.categories = state.categories.filter((c) =>
        c.categoryName.toLowerCase().includes(query)
      );
    },

    updateCategory: (state, action) => {
      const { id, categoryName } = action.payload;

      const category = state.categories.find((c) => c.id === id);
      if (category) {
        category.categoryName = categoryName;
      }

      const visibleCategory = state.categories.find((c) => c.id === id);
      if (visibleCategory) {
        visibleCategory.categoryName = categoryName;
      }
    },
  },
});

export const {
  addCategory,
  removeCategory,
  searchCategory,
  updateCategory,
} = categorySlice.actions;

export default categorySlice.reducer;
