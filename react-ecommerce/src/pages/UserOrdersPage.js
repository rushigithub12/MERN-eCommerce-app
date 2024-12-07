import React from "react";
import UserOrders from "../features/user/components/UserOrders";
import Navbar from "../features/navbar/Navbar";

function UserOrdersPage() {
  return (
    <Navbar>
        <h1 className="mx-auto text-2xl" >My Orders</h1>
      <UserOrders />
    </Navbar>
  );
}

export default UserOrdersPage;
