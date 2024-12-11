import React from 'react'
import Navbar from '../features/navbar/Navbar'
import AdminProductDetails from '../features/adminFeature/components/AdminProductDetails';

function AdminProductDetailPage() {
  return (
      <>
         <Navbar>
            <AdminProductDetails />
         </Navbar>
      </>
  )
}

export default AdminProductDetailPage;