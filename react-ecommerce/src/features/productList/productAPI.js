import { api } from "../../api/apiClient";

export async function createProduct(product) {
  return api
    .post("/products", product)
    .then((data) => ({ data }))
    .catch((error) => {
      throw new Error(error.message || "Failed to create product");
    });
}

export async function updateProduct(product) {
  return api
    .patch(`/products/${product.id}`, product)
    .then((data) => ({ data }))
    .catch((error) => {
      throw new Error(error.message || "Failed to update product");
    });
}

export async function fetchProductById(id) {
  return api
    .get(`/products/${id}`)
    .then((data) => ({ data }))
    .catch((error) => {
      throw new Error(error.message || "Failed to fetch product");
    });
}

export async function fetchAllProductsByFilter(
  filter = {},
  sort = {},
  pagination = {},
  admin = false
) {
  try {
    const params = {};

    for (const key in filter) {
      const categoryValues = filter[key];
      if (Array.isArray(categoryValues) && categoryValues.length) {
        params[key] = categoryValues;
      }
    }

    for (const key in sort) {
      params[key] = sort[key];
    }

    for (const key in pagination) {
      params[key] = pagination[key];
    }

    if (admin) {
      params.admin = true;
    }

    return api
      .get("/products", { params })
      .then((data) => ({
        data: {
          products: Array.isArray(data)
            ? data
            : data.products || data.data || [],
          totalItems: data.items || data.total || 0,
        },
      }))
      .catch((error) => {
        throw new Error(error.message || "Failed to fetch products");
      });
  } catch (error) {
    return Promise.reject(
      new Error(error.message || "Failed to fetch products")
    );
  }
}

export async function fetchProductbrands() {
  return api
    .get("/brands")
    .then((data) => ({ data }))
    .catch((error) => {
      throw new Error(error.message || "Failed to fetch brands");
    });
}

export async function fetchProductCategories() {
  return api
    .get("/category")
    .then((data) => ({ data }))
    .catch((error) => {
      throw new Error(error.message || "Failed to fetch categories");
    });
}
