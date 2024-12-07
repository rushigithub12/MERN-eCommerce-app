
export function addToCart(item) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/cart", {
      method: "POST",
      body: JSON.stringify(item),
      headers: {
        "content-type": "application/json",
      },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchCartByUser(userId){
  return new Promise(async(resolve) => {
    const response = await fetch("http://localhost:8080/cart?user=" + userId);
    const data = await response.json();
    resolve({ data })
  })
}


export function updateCartItem(updatedItem) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/cart/" + updatedItem?.id, {
      method: "PATCH",
      body: JSON.stringify(updatedItem),
      headers: {
        "content-type": "application/json",
      },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function removeItemFromCart(itemId) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/cart/" + itemId, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    });
    const data = await response.json();
    resolve({ data: { id: itemId } });
  });
}

export function resetCart(userId){
  return new Promise(async(resolve, reject) => {
    const response = await fetchCartByUser(userId);
    const cartsData = await response.data;
    console.log("cartsData===>", cartsData)
    for(let cart of cartsData){
      await removeItemFromCart(cart.id)
    }
    resolve({ status: "success" })
  })
  
}