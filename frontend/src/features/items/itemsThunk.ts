import { createAsyncThunk } from "@reduxjs/toolkit";
import { Item, ItemMutation } from "../../types";
import axiosApi from "../../axiosApi";
import { RootState } from "../../app/store";

export const fetchItems = createAsyncThunk<Item[]>(
  "items/fetchAll",
  async () => {
    const response = await axiosApi.get<Item[]>("/items");
    return response.data;
  }
);

export const fetchOneItem = createAsyncThunk<Item, string>(
  "items/fetchOne",
  async (itemId: string) => {
    const response = await axiosApi.get<Item>(`/items/${itemId}`);
    return response.data;
  }
);

export const fetchByCategory = createAsyncThunk<Item[], string>(
  "items/fetchByCategory",
  async (categoryId: string) => {
    const response = await axiosApi.get<Item[]>(
      `/items/category/${categoryId}`
    );
    return response.data;
  }
);

export const createItem = createAsyncThunk<
  void,
  ItemMutation,
  { state: RootState }
>("items/create", async (itemMutation, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.users.user?.token;

    if (token) {
      const formData = new FormData();

      Object.entries(itemMutation).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          formData.append(key, value as string);
        }
      });

      await axiosApi.post("/items", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
    }
  } catch (e) {
    console.error(e);
  }
});

export const deleteItem = createAsyncThunk<void, string, { state: RootState }>(
  "items/delete",
  async (itemId: string, thunkApi) => {
    try {
      const state = thunkApi.getState();
      const token = state.users.user?.token;

      if (token) {
        await axiosApi.delete(`/items/${itemId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
    } catch (e) {
      console.error(e);
    }
  }
);
