import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createProduct,
  fetchProductById,
  fetchAllProductsByFilter,
  fetchProductbrands,
  fetchProductCategories,
  updateProduct,
} from "./productAPI";

const initialState = {
  products: [],
  status: "idle",
  totalItems: 0,
  brands: [],
  categories: [],
  selectedProductbyId: null,
};

export const fetchAllProductByFiltersAsync = createAsyncThunk(
  "product/fetchAllProductsByFilter",
  async ({ filter, sort, pagination, admin }) => {
    const response = await fetchAllProductsByFilter(
      filter,
      sort,
      pagination,
      admin
    );
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

export const fetchProductByIdAsync = createAsyncThunk(
  "product/fetchProductById",
  async (id) => {
    const response = await fetchProductById(id);
    return response.data;
  }
);

export const createProductAsync = createAsyncThunk(
  "product/createProduct",
  async (product) => {
    const response = await createProduct(product);
    return response.data;
  }
);

export const updateProductAsync = createAsyncThunk(
  "product/updateProduct",
  async (product) => {
    const response = await updateProduct(product);
    return response.data;
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    clearSelectedProduct: (state) => {
      state.selectedProductbyId = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductByFiltersAsync.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchAllProductByFiltersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload.products;
        state.totalItems = action.payload.totalItems;
      })
      .addCase(fetchAllProductByBrandsAsync.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchAllProductByBrandsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.brands = action.payload;
      })
      .addCase(fetchAllProductByCategoriesAsync.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchAllProductByCategoriesAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.categories = action.payload;
      })
      .addCase(fetchProductByIdAsync.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.selectedProductbyId = action.payload;
      })
      .addCase(createProductAsync.pending, (state) => {
        state.status = "pending";
      })
      .addCase(createProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products.push(action.payload);
      })
      .addCase(updateProductAsync.pending, (state) => {
        state.status = "pending";
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        const foundIndex = state.products?.findIndex(
          (product) => product.id === action.payload.id
        );

        state.status = "idle";
        state.products[foundIndex] = action.payload;
      });
  },
});

export const { clearSelectedProduct } = productSlice.actions;

export const selectProducts = (state) => state.product.products;
export const selectTotalItems = (state) => state.product.totalItems;
export const selectProductBrands = (state) => state.product.brands;
export const selectProductCategories = (state) => state.product.categories;
export const selectedProductbyId = (state) => state.product.selectedProductbyId;
export const selectProductStatus = (state) => state.product.status;

export default productSlice.reducer;
