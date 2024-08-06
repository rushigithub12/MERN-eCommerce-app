import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchProductList } from "./productAPI";

const initialState = {
  value: 0,
  status: "idle",
};

export const incrementAsync = createAsyncThunk(
  "product/fetchProductList",
  async (amount) => {
    const response = await fetchProductList(amount);
    return response.data;
  }
);

export  const productListSlice = createSlice({
  name: "productList",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  // extraReducers: (builder) => {
  //   () => {}
  // },
});

export const { increment } = productListSlice.actions;

export const selectProductList = (state) => state.productList;

export default productListSlice.reducer;
