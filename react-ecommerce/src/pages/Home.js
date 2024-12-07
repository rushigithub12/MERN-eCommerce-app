import React from "react";
import Navbar from "../features/navbar/Navbar";
import ProductList from "../features/productList/components/ProductList";

function Home() {
  return (
    <>
      <Navbar>
        <ProductList />
      </Navbar>
    </>
  );
}

export default Home;
