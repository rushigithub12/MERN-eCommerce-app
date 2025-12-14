
export function addToCart(item) {
  return new Promise(async (resolve) => {
    const response = await fetch("/cart", {
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

export function fetchCartByUser(){
  return new Promise(async(resolve) => {
    const response = await fetch("/cart");
    const data = await response.json();
    resolve({ data })
  })
}


export function updateCartItem(updatedItem) {
  return new Promise(async (resolve) => {
    const response = await fetch("/cart/" + updatedItem?.id, {
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
    const response = await fetch("/cart/" + itemId, {
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
    const response = await fetchCartByUser();
    const cartsData = await response.data;
    for(let cart of cartsData){
      await removeItemFromCart(cart.id)
    }
    resolve({ status: "success" })
  })
  
}