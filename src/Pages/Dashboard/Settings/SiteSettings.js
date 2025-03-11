import React from 'react'
import SideBar from '../../../Component/Dashboard/SideBar'
import Header from '../../../Component/Dashboard/Header'
import SettingsContent from '../../../Component/Dashboard/SiteSettings/SettingContent'

const SiteSettings = () => {
  return (
    <div className="flex h-full">
      <SideBar />
      <div className="flex-1 px-4">
        <Header />
        <SettingsContent />
      </div>
      
    </div>
  )
}

export default SiteSettings
