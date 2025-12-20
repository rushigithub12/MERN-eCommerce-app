import { api } from "../../api/apiClient";

export function createUser(userData) {
  return api
    .post("/auth/signup", userData)
    .then((data) => ({ data }))
    .catch((error) => {
      throw new Error(error.message || "Signup failed");
    });
}

export function checkLoggedInuser(loginInfo) {
  return api
    .post("/auth/login", loginInfo)
    .then((data) => ({ data }))
    .catch((error) => {
      throw new Error(error.message || "Login failed");
    });
}

export function checkAuthUser() {
  return api
    .get("/auth/checkAuth")
    .then((data) => ({ data }))
    .catch((error) => {
      return { data: null };
    });
}

export function signOut(userId) {
  return Promise.resolve({ data: "Successfully logged out!" });
}
