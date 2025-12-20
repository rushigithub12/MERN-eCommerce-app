import { api } from "../../api/apiClient";

export async function addToCart(item) {
  return api
    .post("/cart", item)
    .then((data) => ({ data }))
    .catch((error) => {
      throw new Error(error.message || "Failed to add item to cart");
    });
}

export async function fetchCartByUser() {
  return api
    .get("/cart")
    .then((data) => ({ data }))
    .catch((error) => {
      throw new Error(error.message || "Failed to fetch cart");
    });
}

export async function updateCartItem(updatedItem) {
  return api
    .put(`/cart/${updatedItem?.id}`, updatedItem)
    .then((data) => ({ data }))
    .catch((error) => {
      throw new Error(error.message || "Failed to update cart item");
    });
}

export async function removeItemFromCart(itemId) {
  return api
    .delete(`/cart/${itemId}`)
    .then((data) => ({ data }))
    .catch((error) => {
      throw new Error(error.message || "Failed to remove item from cart");
    });
}

export async function resetCart(userId) {
  try {
    const cartResponse = await fetchCartByUser();
    const cartsData = cartResponse.data || [];
  
    for (const cart of cartsData) {
      try {
        await removeItemFromCart(cart.id);
      } catch (error) {
        console.error(`Failed to remove cart item ${cart.id}:`, error);
      }
    }
    
    return { status: "success" };
  } catch (error) {
    throw new Error(error.message || "Failed to reset cart");
  }
}
