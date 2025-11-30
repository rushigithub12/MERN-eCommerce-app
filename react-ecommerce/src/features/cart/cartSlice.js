import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addToCart, fetchCartByUser, removeItemFromCart, resetCart, updateCartItem } from "./cartAPI";

const initialState = {
  items: [],
  status: "idle",
};

// export const incrementAsync = createAsyncThunk(
//   "cart/fetchCart",
//   async (amount) => {
//     const response = await fetchCart(amount);
//     return response.data;
//   }
// );

export const addToCartAsync = createAsyncThunk(
  "cart/addToCart",
  async (item) => {
    const response = await addToCart(item);
    return response.data;
  }
);

export const fetchCartByUserAsync = createAsyncThunk(
  "cart/fetchCartByUser",
  async () => {
    const response = await fetchCartByUser();
    return response.data;
  }
);

export const updateCartItemAsync = createAsyncThunk(
  "cart/updateCartItem",
  async (updatedItem) => {
    const response = await updateCartItem(updatedItem);
    return response.data;
  }
);


export const removeItemFromCartAsync = createAsyncThunk(
  "cart/removeItemFromCart",
  async (itemId) => {
    const response = await removeItemFromCart(itemId);
    return response.data;
  }
);

export const resetUserCartsAsync = createAsyncThunk(
  "cart/removeUserCarts",
  async () => {
    const response = await resetCart();
    return response.data;
  }
);


export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.status = "pending";
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items.push(action.payload);
      })
      .addCase(fetchCartByUserAsync.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchCartByUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = action.payload;
      })
      .addCase(updateCartItemAsync.pending, (state) => {
        state.status = "pending";
      })
      .addCase(updateCartItemAsync.fulfilled, (state, action) => {
        const foundIndex = state.items?.findIndex(
          (item) => item.id === action.payload.id
        );

        state.status = "idle";
        state.items[foundIndex] = action.payload;
      })
      .addCase(removeItemFromCartAsync.pending, (state) => {
        state.status = "pending";
      })
      .addCase(removeItemFromCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const foundIndex = state.items?.findIndex((item) => item.id === action.payload.id)
        state.items.splice(foundIndex, 1);
      })
      .addCase(resetUserCartsAsync.pending, (state) => {
        state.status = "pending";
      })
      .addCase(resetUserCartsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = [];
      });
  },
});

export const selectCartItems = (state) => state.cart.items;

export default cartSlice.reducer;
