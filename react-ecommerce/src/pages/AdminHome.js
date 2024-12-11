import React from "react";
import Navbar from "../features/navbar/Navbar";
import AdminProductList from "../features/adminFeature/components/AdminProductList";

function AdminHome() {
  return (
    <>
      <Navbar>
        <AdminProductList />
      </Navbar>
    </>
  );
}

export default AdminHome;
