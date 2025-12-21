import { api } from "../../api/apiClient";

export async function createdOrder(order) {
  return api
    .post("/orders", order)
    .then((data) => ({ data }))
    .catch((error) => {
      throw new Error(error.message || "Failed to create order");
    });
}

export async function fetchAllOrders(sort = {}, pagination = {}) {
  try {
    const params = {
      ...pagination,
      ...sort,
    };

    return api
      .get("/orders", { params })
      .then((data) => ({
        data: {
          orders: Array.isArray(data) ? data : data.orders || data.data || [],
          totalOrders: data.items || data.total || 0,
        },
      }))
      .catch((error) => {
        throw new Error(error.message || "Failed to fetch orders");
      });
  } catch (error) {
    return Promise.reject(new Error(error.message || "Failed to fetch orders"));
  }
}

export async function updateOrder(order) {
  return api
    .patch(`/orders/${order.id}`, order)
    .then((data) => ({ data }))
    .catch((error) => {
      throw new Error(error.message || "Failed to update order");
    });
}