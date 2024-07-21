import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchCart } from "./cartAPI";


const initialState = {
  value: 0,
  status: "idle",
};

export const incrementAsync = createAsyncThunk(
  "cart/fetchCart",
  async (amount) => {
    const response = await fetchCart(amount);
    return response.data;
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(incrementAsync.pending, (state) => {
  //       state.status = "loading";
  //     })
  //     .addCase(incrementAsync.fulfilled, (state, action) => {
  //       state.status = "idle";
  //       state.value += action.payload;
  //     });
  // },
});

export const { increment } = cartSlice.actions;

export const selectCart = (state) => state.cart.value;

export default cartSlice.reducer;
