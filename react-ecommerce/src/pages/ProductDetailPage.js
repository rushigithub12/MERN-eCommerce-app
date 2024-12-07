import React from 'react'
import Navbar from '../features/navbar/Navbar'
import ProductDetails from '../features/productList/components/ProductDetails'

function ProductDetailPage() {
  return (
      <>
         <Navbar>
            <ProductDetails />
         </Navbar>
      </>
  )
}

export default ProductDetailPage;