import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createdOrder } from "./orderAPI";

const initialState = {
  orders: [],
  status: "idle",
};

export const createdOrderAsync = createAsyncThunk(
  "order/createdOrder",
  async (order) => {
    const response = await createdOrder(order);
    return response.data;
  }
);

export const cartSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createdOrderAsync.pending, (state) => {
        state.status = "pending";
      })
      .addCase(createdOrderAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.orders.push(action.payload);
      });
  },
});

export const selectOrders = (state) => state.order.orders;

export default cartSlice.reducer;
