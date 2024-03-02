import { createSlice } from "@reduxjs/toolkit";
import { Category } from "../../types";
import { RootState } from "../../app/store";
import { fetchCategories, fetchOneCategory } from "./categoriesThunk";

interface categoriesState {
  categories: Category[];
  singleCategory: Category | null;
  fetchLoading: boolean;
  singleFetchLoading: boolean;
}

const initialState: categoriesState = {
  categories: [],
  singleCategory: null,
  fetchLoading: false,
  singleFetchLoading: false,
};

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(
      fetchCategories.fulfilled,
      (state, { payload: categories }) => {
        state.fetchLoading = false;
        state.categories = categories;
      }
    );
    builder.addCase(fetchCategories.rejected, (state) => {
      state.fetchLoading = false;
    });

    builder.addCase(fetchOneCategory.pending, (state) => {
      state.singleFetchLoading = true;
    });
    builder.addCase(
      fetchOneCategory.fulfilled,
      (state, { payload: category }) => {
        state.singleFetchLoading = false;
        state.singleCategory = category;
      }
    );
    builder.addCase(fetchOneCategory.rejected, (state) => {
      state.singleFetchLoading = false;
    });
  },
});

export const categoriesReducer = categoriesSlice.reducer;
export const selectCategories = (state: RootState) =>
  state.categories.categories;
export const selectSingleCategory = (state: RootState) =>
  state.categories.singleCategory;
export const selectCategoriesLoading = (state: RootState) =>
  state.categories.fetchLoading;
export const selectSingleCategoryLoading = (state: RootState) =>
  state.categories.singleFetchLoading;
