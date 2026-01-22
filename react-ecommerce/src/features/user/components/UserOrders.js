import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLoggedInUserOrdersrAsync,
  selectUserInfoStatus,
  selectUserOrders,
} from "../userSlice";
import { discountedPrice } from "../../../app/constants";
import { Grid } from "react-loader-spinner";

function UserOrders() {
  const dispatch = useDispatch();
  const userOrders = useSelector(selectUserOrders);
  const status = useSelector(selectUserInfoStatus);

  useEffect(() => {
    dispatch(fetchLoggedInUserOrdersrAsync());
  }, [dispatch]);

  return (
    <div>
      {userOrders &&
        userOrders?.map((order) => (
          <div
            key={order.id}
            className="mx-auto mt-12 bg-white max-w-7xl px-2 sm:px-2 lg:px-4"
          >
            <div className="border-t border-gray-200 px-0 py-6 sm:px-0">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                Order #{order.id}
              </h1>
              <h3 className="text-xl font-bold tracking-tight text-red-900">
                Order Status: {order.status}
              </h3>
              <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <div className="flow-root">
                  <ul className="-my-6 divide-y divide-gray-200">
                    {order?.cartItems?.map((order) => (
                      <li key={order.id} className="flex py-6">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <img
                            alt={order.product.title}
                            src={order.product.thumbnail}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>
                                <a href={order.href}>{order.product.title}</a>
                              </h3>
                              <p className="ml-4">
                                ${discountedPrice(order.product)}
                              </p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">
                              {order.product.brand}
                            </p>
                          </div>
                          <div className="flex flex-1 items-end justify-between text-sm">
                            <div>
                              <label
                                htmlFor="quantity"
                                className="inline mr-5 text-sm font-medium leading-6 text-gray-900"
                              >
                                Qty: {order.quantity}
                              </label>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Subtotal</p>
                  <p>${order.totalAmount}</p>
                </div>
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Total items in Cart</p>
                  <p>{order.totalitems} items</p>
                </div>
                <p className="mt-0.5 text-sm text-gray-500">Address:</p>
                <div className="flex justify-between gap-x-6 p-5 border border-solid-2 border-gray-300">
                  <div className="flex min-w-0 gap-x-4">
                    <div className="min-w-0 flex-auto">
                      <p className="text-sm font-semibold leading-6 text-gray-900">
                        {order.selectedAddress.name}
                      </p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                        {order.selectedAddress.street}
                      </p>
                    </div>
                  </div>
                  <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                    <p className="text-sm leading-6 text-gray-900">
                      Phone{order.selectedAddress.phone}
                    </p>
                    <p className="text-sm leading-6 text-gray-900">
                      {order.selectedAddress.pinCode}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

      {status === "pending" ? (
        <Grid
          height="80"
          width="80"
          color="rgb(79, 70, 229) "
          ariaLabel="grid-loading"
          radius="12.5"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      ) : null}
    </div>
  );
}

export default UserOrders;
