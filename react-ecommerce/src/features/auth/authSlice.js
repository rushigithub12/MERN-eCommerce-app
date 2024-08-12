import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { checkLoggedInuser, createUser } from "./authAPI";

const initialState = {
  loggedInuser: null,
  status: "idle",
  error: null
};

export const createUserAsync = createAsyncThunk(
  "user/createuser",
  async (userData) => {
    const response = await createUser(userData);
    return response.data;
  }
);

export const checkloggedInUserAsync = createAsyncThunk(
  "user/checkLoggedInuser",
  async (loginInfo) => {
    const response = await checkLoggedInuser(loginInfo);
    return response.data;
  }
);

export  const productListSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = "pending";
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        (state.status = "idle"); (state.loggedInuser = action.payload);
      })
      .addCase(checkloggedInUserAsync.pending, (state) => {
        state.status = "pending";
      })
      .addCase(checkloggedInUserAsync.fulfilled, (state, action) => {
        (state.status = "idle"); (state.loggedInuser = action.payload);
      })
      .addCase(checkloggedInUserAsync.rejected, (state, action) => {
        (state.status = "idle"); (state.error = action.error);
      })
  },
});


export const selectedLoggedInUser = (state) => state?.auth?.loggedInuser;
export const errorLoggedInUser = (state) => state?.auth?.error;

export default productListSlice.reducer;
