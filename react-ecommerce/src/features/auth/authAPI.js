// A mock function to mimic making an async request for data
export function createUser(userData) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/users", {
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

export function updateUser(updatedUser) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/users/" + updatedUser.id, {
      method: "PATCH",
      body: JSON.stringify(updatedUser),
      headers: {
        "content-type": "application/json",
      },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function checkLoggedInuser(loginInfo) {
  const email = loginInfo?.email;
  const password = loginInfo.password;

  return new Promise(async (resolve, reject) => {
    const response = await fetch("http://localhost:8080/users?email=" + email);
    const data = await response.json();
    
    console.log('checkLoggedInuser==>', data);

    if (data?.length) {
      if (password === data[0].password) {
        resolve({ data: data[0] });
      } else {
        reject({ message: "Wrong credentials..." });
      }
    } else {
      reject({ message: "User not found." });
    }
  });
}
