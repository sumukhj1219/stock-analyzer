import React from 'react'
import Sidebar from '@/components/Sidebar'
import Navbar from '@/components/Navbar'

const DashboardLayout = ({children}) => {
  return (
    <div className="flex flex-col h-screen bg-neutral-800">

      <div className="flex flex-1">
        <div >
          <Sidebar />
        </div>

        <div className="flex-1 overflow-auto p-6">
          {children}
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout
