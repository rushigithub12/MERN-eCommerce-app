import React from "react";
import AdminOrders from "../features/adminFeature/components/AdminOrders";
import Navbar from "../features/navbar/Navbar";

function AdminOrdersPage() {
  return (
    <Navbar>
      <AdminOrders />
    </Navbar>
  );
}

export default AdminOrdersPage;
