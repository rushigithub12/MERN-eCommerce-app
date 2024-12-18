import React from "react";
import ProductForm from "../features/adminFeature/components/ProductForm";
import Navbar from "../features/navbar/Navbar";

function AdminProductFormPage() {
  return (
    <>
      <Navbar>
        <ProductForm />
      </Navbar>
    </>
  );
}

export default AdminProductFormPage;
