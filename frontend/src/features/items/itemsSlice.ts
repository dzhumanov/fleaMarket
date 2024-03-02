import { createSlice } from "@reduxjs/toolkit";
import { Item } from "../../types";
import { RootState } from "../../app/store";
import { fetchItems, fetchOneItem } from "./itemsThunk";

interface itemsState {
  items: Item[];
  singleItem: Item | null;
  fetchLoading: boolean;
  singleFetchLoading: boolean;
}

const initialState: itemsState = {
  items: [],
  singleItem: null,
  fetchLoading: false,
  singleFetchLoading: false,
};

export const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchItems.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchItems.fulfilled, (state, { payload: items }) => {
      state.fetchLoading = false;
      state.items = items;
    });
    builder.addCase(fetchItems.rejected, (state) => {
      state.fetchLoading = false;
    });

    builder.addCase(fetchOneItem.pending, (state) => {
      state.singleFetchLoading = true;
    });
    builder.addCase(fetchOneItem.fulfilled, (state, { payload: item }) => {
      state.singleFetchLoading = false;
      state.singleItem = item;
    });
    builder.addCase(fetchOneItem.rejected, (state) => {
      state.singleFetchLoading = false;
    });
  },
});

export const itemsReducer = itemsSlice.reducer;
export const selectItems = (state: RootState) => state.items.items;
export const selectSingleItem = (state: RootState) => state.items.singleItem;
export const selectItemsLoading = (state: RootState) =>
  state.items.fetchLoading;
export const selectSingleItemLoading = (state: RootState) =>
  state.items.singleFetchLoading;
