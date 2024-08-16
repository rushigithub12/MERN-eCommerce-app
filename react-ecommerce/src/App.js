import React, { useEffect } from "react";
import "./App.css";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import { Cart } from "./features/cart/Cart";
import Checkout from "./pages/Checkout";
import ProductDetails from "./features/productList/components/ProductDetails";
import ProductDetailPage from "./pages/ProductDetailPage";
import Protected from "./features/auth/components/Protected";
import { useDispatch, useSelector } from "react-redux";
import { selectedLoggedInUser } from "./features/auth/authSlice";
import {  fetchCartByUserAsync } from "./features/cart/cartSlice";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected>
        <Home />
      </Protected>
    ),
  },
  {
    path: "login",
    element: <LoginPage />,
  },
  {
    path: "signup",
    element: <SignupPage />,
  },
  {
    path: "cart",
    element: (
      <Protected>
        <Cart />
      </Protected>
    ),
  },
  {
    path: "checkout",
    element: (
      <Protected>
        <Checkout />
      </Protected>
    ),
  },
  {
    path: "product-detail/:id",
    element: (
      <Protected>
        <ProductDetailPage />
      </Protected>
    ),
  },
]);

function App() {
  const user = useSelector(selectedLoggedInUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCartByUserAsync(user?.id))
  }, [dispatch, user])


  return (
    <div className="App">
      {/* <Home /> */}
      {/* <LoginPage /> */}
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
