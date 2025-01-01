import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  PencilIcon,
  EyeIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from "@heroicons/react/24/outline";
import { discountedPrice, ITEM_PER_PAGE } from "../../../app/constants";
import {
  fetchAllOrdersAsync,
  selectOrders,
  selectTotalOrder,
  updateOrderAsync,
} from "../../order/orderSlice";

function AdminOrders() {
  const [page, setPage] = useState(1);
  const [editableOrder, setEditableOrder] = useState(-1);

  const orders = useSelector(selectOrders);
  const totalOrders = useSelector(selectTotalOrder);
  const dispatch = useDispatch();

  useEffect(() => {
    const pagination = { _page: page, _limit: ITEM_PER_PAGE };
    dispatch(fetchAllOrdersAsync({ pagination }));
  }, [dispatch, page]);

  const handleShow = (order) => {
    console.log("handleShow===>>>", order);
  };

  const handleEdit = (order) => {
    setEditableOrder(order.id);
  };

  const handleUpdateStatus = (e, order) => {
    const updatedOrder = { ...order, status: e.target.value };
    dispatch(updateOrderAsync(updatedOrder));
  };

  return (
    <>
      <div className="overflow-x-auto">
        <div className="flex items-center justify-center bg-gray-100 font-sans overflow-hidden">
          <div className="w-full">
            <div className="bg-white shadow-md rounded my-6">
              <table className="min-w-max w-full table-auto">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left">Order#</th>
                    <th className="py-3 px-6 text-left">Items</th>
                    <th className="py-3 px-6 text-center">Total Amount</th>
                    <th className="py-3 px-6 text-center">Shipping Address</th>
                    <th className="py-3 px-6 text-center">Status</th>
                    <th className="py-3 px-6 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                  {orders?.map((order, ind) => (
                    <tr
                      key={order.id}
                      className="border-b border-gray-200 hover:bg-gray-100"
                    >
                      <td className="py-3 px-6 text-left whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="font-medium">{order.id}</span>
                        </div>
                      </td>
                      <td className="py-3 px-6 text-left">
                        {order.cartItems?.map((item) => (
                          <div key={item.id} className="flex items-center">
                            <div className="mr-2">
                              <img
                                className="w-6 h-6 rounded-full"
                                src={item.thumbnail}
                              />
                            </div>
                            <span>
                              {item.title} - #{item.quantity} - $
                              {discountedPrice(item)}
                            </span>
                          </div>
                        ))}
                      </td>
                      <td className="py-3 px-6 text-center">
                        ${order.totalAmount}
                      </td>
                      <td className="py-3 px-6 text-center">
                        <div className="flex justify-center item-center flex-col">
                          <div>
                            <strong>{order.selectedAddress.name},</strong>
                          </div>
                          <div>{order.selectedAddress.street},</div>
                          <div>{order.selectedAddress.city},</div>
                          <div>{order.selectedAddress.state},</div>
                          <div>{order.selectedAddress.pinCode},</div>
                          <div>{order.selectedAddress.phone}</div>
                        </div>
                      </td>
                      <td className="py-3 px-6 text-center">
                        {order.id === editableOrder ? (
                          <select
                            name=""
                            id=""
                            onChange={(e) => handleUpdateStatus(e, order)}
                          >
                            <option value="pending">Pending</option>
                            <option value="dispatched">Dispatched</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancel">Cancel</option>
                          </select>
                        ) : (
                          <span className="bg-purple-200 text-purple-600 py-1 px-3 rounded-full text-xs">
                            {order.status}
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-6 text-center">
                        <div className="flex item-center justify-center">
                          <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110 cursor-pointer">
                            <EyeIcon
                              className="w-6 h-6"
                              onClick={(e) => handleShow(order)}
                            />
                          </div>
                          <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110 cursor-pointer">
                            <PencilIcon
                              className="w-6 h-6"
                              onClick={(e) => handleEdit(order)}
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminOrders;
