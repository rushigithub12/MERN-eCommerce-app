import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { checkLoggedInuser, createUser, signOut } from "./authAPI";
import { updateUser } from "../user/userAPI";

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

export const updateUserAsync = createAsyncThunk(
  "user/updateUser",
  async (updatedUser) => {
    const response = await updateUser(updatedUser);
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


export const signOutAsync = createAsyncThunk("user/signOut", async(userId) => {
  const response = await signOut(userId);
  return response.data
})

export  const authSlice = createSlice({
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
      .addCase(updateUserAsync.pending, (state) => {
        state.status = "pending";
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        (state.status = "idle"); (state.loggedInuser = action.payload);
      })
      .addCase(signOutAsync.pending, (state) => {
        state.status = "pending";
      })
      .addCase(signOutAsync.fulfilled, (state, action) => {
        (state.status = "idle"); (state.loggedInuser = null);
      })
  },
});


export const selectedLoggedInUser = (state) => state?.auth?.loggedInuser;
export const errorLoggedInUser = (state) => state?.auth?.error;

export default authSlice.reducer;
