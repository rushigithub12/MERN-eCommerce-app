import { api } from "../../api/apiClient";

export async function createUser(userData) {
  return api
    .post("/auth/signup", userData)
    .then((data) => ({ data }))
    .catch((error) => {
      throw new Error(error.message || "Signup failed");
    });
}

export async function checkLoggedInuser(loginInfo) {
  return api
    .post("/auth/login", loginInfo)
    .then((data) => ({ data }))
}

export async function checkAuthUser() {
  return api
    .get("/auth/checkAuth")
    .then((data) => ({ data }))
    .catch((error) => {
      return { data: null };
    });
}

export async function signOut(userId) {
  return Promise.resolve({ data: "Successfully logged out!" });
}

export async function resetPasswordRequest(email) {
  return api
    .post("/auth/reset-password-request", { email: email})
    .then((data) => ({ data }))
    .catch((error) => {
      throw new Error(error.message || "Auth request failed");
    });
}

export async function resetPassword(dataBody) {
  return api
    .post("/auth/reset-password", dataBody)
    .then((data) => ({ data }))
    .catch((error) => {
      throw new Error(error.message || "Auth request failed");
    });
}
