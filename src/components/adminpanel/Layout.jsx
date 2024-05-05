import React from 'react'
import Topbar from './Topbar'
import Sidebar from './Sidebar'

const Layout = ({ children }) => {
  return (
    <div>
      <Sidebar/>
      <Topbar/>
      {children}
    </div>
  )
}

export default Layout
