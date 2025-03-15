import React from 'react'
import NavigationBar from '../Components/NavigationBar/NavigationBar'
import HolidayCalander from '../Components/HolidayCalander/HolidayCalander'
import Footer from '../Components/Footer/Footer'

const HolidayCalanderPage = () => {
  return (
    <div>
        <NavigationBar />
        <HolidayCalander />
        <Footer />
    </div>
  )
}

export default HolidayCalanderPage