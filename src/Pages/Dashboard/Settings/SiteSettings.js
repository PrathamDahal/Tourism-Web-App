import React from 'react'
import SettingsContent from './../../../Component/Dashboard/Admin-Dashboard/SiteSettings/SettingContent'
import Header from './../../../Component/Dashboard/Admin-Dashboard/Header';
import SideBar from './../../../Component/Dashboard/Admin-Dashboard/SideBar';

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
