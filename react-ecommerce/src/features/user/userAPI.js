import { api } from "../../api/apiClient";

export async function fetchLoggedInUser() {
  return api.get("/users/own");
}

export async function fetchLoggedInUserOrders() {
  return api.get("/orders/own");
}

export async function updateUser(updatedUser) {
  return api
    .patch(`/users/${updatedUser.id}`, updatedUser)
    .then((data) => ({ data }))
    .catch((error) => {
      throw new Error(error.message || "Failed to update user");
    });
}
