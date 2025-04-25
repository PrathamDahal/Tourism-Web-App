import React from 'react'
import SideBar from '../../../Component/Dashboard/SideBar'
import Header from '../../../Component/Dashboard/Header'
import MyProducts from '../../../Component/Dashboard/Admin-Dashboard/Product/MyProducts'

const Product = () => {
  return (
    <div>
      <div className="flex h-full">
      <SideBar />
      <div className="flex-1 px-4">
        <Header />
        <MyProducts />
      </div>
    </div>
    </div>
  )
}

export default Product
