// A mock function to mimic making an async request for data
export function createUser(userData) {
  return new Promise(async (resolve) => {
    const response = await fetch("/auth/signup", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "content-type": "application/json",
      },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function checkLoggedInuser(loginInfo) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("/auth/login", {
        method: "POST",
        body: JSON.stringify(loginInfo),
        headers: {
          "content-type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        const error = await response.text();
        reject(error);
      }
    } catch (err) {
      reject({ err });
    }
  });
}

export function checkAuthUser() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("/auth/checkAuth");
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        const error = await response.text();
        reject(error);
      }
    } catch (err) {
      reject({ err });
    }
  });
}

export function signOut(userId) {
  return new Promise(async (resolve) => {
    //Todo: remove user from session
    resolve({ data: "Succesfully logged out!" });
  });
}
