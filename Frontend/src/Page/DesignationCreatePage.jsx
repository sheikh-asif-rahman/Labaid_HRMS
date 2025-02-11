import React from 'react'
import DesignationCreate from '../Components/DesignationCreate/DesignationCreate'
import NavigationBar from '../Components/NavigationBar/NavigationBar'
import Footer from '../Components/Footer/Footer'

const DesignationCreatePage = () => {
  return (
    <div>
        <NavigationBar />
        <DesignationCreate />
        <Footer />
    </div>
  )
}

export default DesignationCreatePage