export function createdOrder(order) {
  return new Promise(async (resolve) => {
    const response = await fetch("/orders", {
      method: "POST",
      body: JSON.stringify(order),
      headers: {
        "content-type": "application/json",
      },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchAllOrders(sort, pagination) {
  let queryString = "";
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }

  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }

  return new Promise(async (resolve) => {
    const response = await fetch("/orders?" + queryString);
    const ordersdData = await response.json();
    resolve({
      data: { orders: ordersdData.data, totalOrders: ordersdData.items },
    });
  });
}

export function updateOrder(order) {
  return new Promise(async (resolve) => {
    const response = await fetch("/orders/" + order.id, {
      method: "PATCH",
      body: JSON.stringify(order),
      headers: {
        "content-type": "application/json",
      },
    });
    const data = await response.json();
    resolve({ data });
  });
}
