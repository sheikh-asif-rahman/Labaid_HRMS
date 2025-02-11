import React from 'react'
import NavigationBar from '../Components/NavigationBar/NavigationBar'
import Footer from '../Components/Footer/Footer'
import DepartmentCreate from '../Components/DepartmentCreate/DepartmentCreate'

const DepartmentCreatePage = () => {
  return (
    <div>
        <NavigationBar />
        <DepartmentCreate />
        <Footer />
    </div>
  )
}

export default DepartmentCreatePage