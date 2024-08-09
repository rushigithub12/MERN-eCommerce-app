import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAllProducts, fetchAllProductsByFilter } from "./productAPI";

const initialState = {
  products: [],
  status: "idle",
};

export const fetchAllProductsAsync = createAsyncThunk(
  "product/fetchAllProducts",
  async () => {
    const response = await fetchAllProducts();
    return response.data;
  }
);

export const fetchAllProductByFiltersAsync = createAsyncThunk(
  "product/fetchAllProductsByFilter",
  async (filter) => {
    const response = await fetchAllProductsByFilter(filter);
    return response.data;
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductsAsync.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
        (state.status = "idle"); (state.products = action.payload);
      })
      .addCase(fetchAllProductByFiltersAsync.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchAllProductByFiltersAsync.fulfilled, (state, action) => {
        (state.status = "idle"); (state.products = action.payload);
      });
  },
});

export const selectProducts = (state) => state.product.products;

export default productSlice.reducer;
