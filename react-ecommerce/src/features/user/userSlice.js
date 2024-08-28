import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchLoggedInUserOrders } from "./userAPI";

const initialState = {
  status: "idle",
  userOrders: [],
};

export const fetchLoggedInUseOrdersrAsync = createAsyncThunk(
  "user/fetchLoggedInUserOrders",
  async (useIrd) => {
    const response = await fetchLoggedInUserOrders(useIrd);
    return response.data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoggedInUseOrdersrAsync.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchLoggedInUseOrdersrAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userOrders = action.payload;
      });
  },
});

// export const { resetOrder } = userSlice.actions;

export const selectUserOrders = (state) => state.user.userOrders;

export default userSlice.reducer;
