import React from 'react'
import NavigationBar from '../Components/NavigationBar/NavigationBar'
import Footer from '../Components/Footer/Footer'
import LeaveManagement from '../Components/LeaveManagement/LeaveManagement'

const LeaveManagementPage = () => {
  return (
    <div>
        <NavigationBar />
        <LeaveManagement />
        <Footer />
    </div>
  )
}

export default LeaveManagementPage