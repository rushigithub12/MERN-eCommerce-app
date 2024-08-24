import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useParams } from "react-router-dom";
import { resetUserCartsAsync } from "../features/cart/cartSlice";
import { selectedLoggedInUser } from "../features/auth/authSlice";
import { resetOrder } from "../features/order/orderSlice";

function OrderSuccess() {
  const user = useSelector(selectedLoggedInUser);
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetUserCartsAsync(user.id));
    dispatch(resetOrder())
  }, [user, dispatch]);

  return (
    <>
      {!params.id && <Navigate to="/" replace={true} />}
      <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-indigo-600">
            Order Successfully Placed
          </p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Order number #{params.id}
          </h1>
          <p className="mt-6 text-base leading-7 text-gray-600">
            You can checkout you orders in MyAccount {">"} Myorder
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to="/"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Go back home
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

export default OrderSuccess;
