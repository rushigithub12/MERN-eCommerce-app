import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  checkAuthUser,
  checkLoggedInuser,
  createUser,
  signOut,
} from "./authAPI";
import { updateUser } from "../user/userAPI";

const initialState = {
  loggedInuserToken: null,
  status: "idle",
  error: null,
  userChecked: false,
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
  async (loginInfo, { rejectWithValue }) => {
    try {
      const response = await checkLoggedInuser(loginInfo);
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const checkAuthUserAsync = createAsyncThunk(
  "user/checkAuthUser",
  async () => {
    try {
      const response = await checkAuthUser();
      return response.data;
    } catch (err) {
      console.log("checkAuthUserAsync=>", err);
    }
  }
);

export const signOutAsync = createAsyncThunk("user/signOut", async (userId) => {
  const response = await signOut(userId);
  return response.data;
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = "pending";
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInuserToken = action.payload;
      })
      .addCase(checkloggedInUserAsync.pending, (state) => {
        state.status = "pending";
      })
      .addCase(checkloggedInUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInuserToken = action.payload;
      })
      .addCase(checkloggedInUserAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = "pending";
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInuserToken = action.payload;
      })
      .addCase(signOutAsync.pending, (state) => {
        state.status = "pending";
      })
      .addCase(signOutAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInuserToken = null;
      })
      .addCase(checkAuthUserAsync.pending, (state) => {
        state.status = "pending";
      })
      .addCase(checkAuthUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInuserToken = action.payload;
        state.userChecked = true;
      })
      .addCase(checkAuthUserAsync.rejected, (state, action) => {
        state.status = "idle";
        state.userChecked = true;
      });
  },
});

export const selectedLoggedInUser = (state) => state?.auth?.loggedInuserToken;
export const errorLoggedInUser = (state) => state?.auth?.error;
export const selectUserChecked = (state) => state?.auth?.userChecked;

export default authSlice.reducer;
