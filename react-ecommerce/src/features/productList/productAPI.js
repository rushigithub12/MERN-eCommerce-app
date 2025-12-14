export function createProduct(product) {
  return new Promise(async (resolve) => {
    const response = await fetch("/products", {
      method: "POST",
      body: JSON.stringify(product),
      headers: {
        "content-type": "application/json",
      },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function updateProduct(product) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      `/products/${product.id}`,
      {
        method: "PATCH",
        body: JSON.stringify(product),
        headers: {
          "content-type": "application/json",
        },
      }
    );
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchProductById(id) {
  return new Promise(async (resolve) => {
    const response = await fetch("/products/" + id);
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchAllProductsByFilter(filter, sort, pagination, admin) {
  //filter={ "category": "smartphone" };
  let queryString = "";
  for (let key in filter) {
    const categoryValues = filter[key];
    if (categoryValues.length) {
      queryString += `${key}=${categoryValues}&`;
    }
  }

  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }

  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }

  if (admin) {
    queryString += `admin=true`;
  }

  return new Promise(async (resolve) => {
    const response = await fetch(
      "/products?" + queryString
    );
    const productsData = await response.json();
    resolve({
      data: { products: productsData.data, totalItems: productsData.items },
    });
  });
}

export function fetchProductbrands() {
  return new Promise(async (resolve) => {
    const response = await fetch("/brands");
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchProductCategories() {
  return new Promise(async (resolve) => {
    const response = await fetch("/category");
    const data = await response.json();
    resolve({ data });
  });
}
