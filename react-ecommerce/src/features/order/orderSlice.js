import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createdOrder, fetchAllOrders, updateOrder } from "./orderAPI";

const initialState = {
  orders: [],
  status: "idle",
  currentOrder: null,
  totalOrders: 0,
};

export const createdOrderAsync = createAsyncThunk(
  "order/createdOrder",
  async (order) => {
    const response = await createdOrder(order);
    return response.data;
  }
);

export const fetchAllOrdersAsync = createAsyncThunk(
  "order/fetchAllOrders",
  async ({ sort, pagination }) => {
    const response = await fetchAllOrders(sort, pagination);
    return response.data;
  }
);

export const updateOrderAsync = createAsyncThunk(
  "order/updateOrder",
  async (order) => {
    const response = await updateOrder(order);
    return response.data;
  }
);

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.currentOrder = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createdOrderAsync.pending, (state) => {
        state.status = "pending";
      })
      .addCase(createdOrderAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.orders.push(action.payload);
        state.currentOrder = action.payload;
      })
      .addCase(updateOrderAsync.pending, (state) => {
        state.status = "pending";
      })
      .addCase(updateOrderAsync.fulfilled, (state, action) => {
        const foundIndex = state.orders?.findIndex(
          (order) => order.id === action.payload.id
        );

        state.status = "idle";
        state.orders[foundIndex] = action.payload;
      })
      .addCase(fetchAllOrdersAsync.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchAllOrdersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.orders = action.payload.orders;
        state.totalOrders = action.payload.totalOrders;
      });
  },
});

export const { resetOrder } = orderSlice.actions;

export const selectOrders = (state) => state.order.orders;
export const selectCurrentOrder = (state) => state.order.currentOrder;
export const selectTotalOrder = (state) => state.order.totalOrders;

export default orderSlice.reducer;
