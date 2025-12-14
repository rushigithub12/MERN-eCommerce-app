export function fetchLoggedInUser() {
  return new Promise(async (resolve) => {
    const response = await fetch("/users/own");
    const data = response.json();
    resolve({ data });
  });
}

export function fetchLoggedInUserOrders() {
  return new Promise(async (resolve) => {
    const response = await fetch("/orders/own");
    const data = await response.json();
    resolve({ data });
  });
}

export function updateUser(updatedUser) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "/users/" + updatedUser.id,
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
