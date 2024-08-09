import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAllProducts, fetchAllProductsByFilter, fetchProductbrands, fetchProductCategories } from "./productAPI";

const initialState = {
  products: [],
  status: "idle",
  totalItems: 0,
  brands: [],
  categories: []
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
  async ({ filter, sort, pagination }) => {
    const response = await fetchAllProductsByFilter( filter, sort, pagination );
    return response.data;
  }
);

export const fetchAllProductByBrandsAsync = createAsyncThunk(
  "product/fetchAllProductsByBrands",
  async () => {
    const response = await fetchProductbrands();
    return response.data;
  }
);

export const fetchAllProductByCategoriesAsync = createAsyncThunk(
  "product/fetchAllProductsByCategories",
  async () => {
    const response = await fetchProductCategories();
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
        (state.status = "idle"); 
        state.products = action.payload.products;
        state.totalItems = action.payload.totalItems;
      })
      .addCase(fetchAllProductByBrandsAsync.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchAllProductByBrandsAsync.fulfilled, (state, action) => {
        (state.status = "idle"); 
        state.brands = action.payload;
      })
      .addCase(fetchAllProductByCategoriesAsync.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchAllProductByCategoriesAsync.fulfilled, (state, action) => {
        (state.status = "idle"); 
        state.categories = action.payload;
      });
  },
});

export const selectProducts = (state) => state.product.products;
export const selectTotalItems = (state) => state.product.totalItems;
export const selectProductBrands = (state) => state.product.brands;
export const selectProductCategories = (state) => state.product.categories;


export default productSlice.reducer;
