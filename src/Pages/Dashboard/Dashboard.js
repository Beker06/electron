import React from 'react'
import Layout from '../../Components/Layout'
import SidebarAdmin from '../../Components/Dashboard/SidebarAdmin'
import BlogsPanel from '../../Components/Dashboard/BlogsPanel'
import "../../Styles/dashboard.css"

const Dashboard = () => {
  return (
    <Layout>
      <div className='dashboard-main-container'>
        <SidebarAdmin/>
        <BlogsPanel/>
      </div>
    </Layout>
  )
    
}

export default Dashboard