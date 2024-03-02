import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi";
import { Category } from "../../types";

export const fetchCategories = createAsyncThunk<Category[]>(
  "categories/fetchAll",
  async () => {
    const response = await axiosApi.get<Category[]>("/items");
    return response.data;
  }
);

export const fetchOneCategory = createAsyncThunk<Category, string>(
  "categories/fetchOne",
  async (categoryId: string) => {
    const response = await axiosApi.get<Category>(`/categories/${categoryId}`);
    return response.data;
  }
);


