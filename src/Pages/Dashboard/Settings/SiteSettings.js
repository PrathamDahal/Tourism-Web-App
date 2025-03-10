import React from 'react'
import SideBar from '../../../Component/Dashboard/SideBar'
import Header from '../../../Component/Dashboard/Header'

const SiteSettings = () => {
  return (
    <div className="flex h-screen">
      <SideBar />
      <div className="flex-1 px-4">
        <Header />
      </div>
    </div>
  )
}

export default SiteSettings
