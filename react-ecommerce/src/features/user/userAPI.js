export function fetchLoggedInUser() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/users/own");
    const data = response.json();
    resolve({ data });
  });
}

export function fetchLoggedInUserOrders() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/orders/own");
    const data = await response.json();
    resolve({ data });
  });
}

export function updateUser(updatedUser) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "http://localhost:8080/users/" + updatedUser.id,
      {
        method: "PATCH",
        body: JSON.stringify(updatedUser),
        headers: {
          "content-type": "application/json",
        },
      }
    );
    const data = await response.json();
    resolve({ data });
  });
}
