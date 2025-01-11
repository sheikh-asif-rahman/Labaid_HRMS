import React from "react";
import NavigationBar from "../Components/NavigationBar/NavigationBar";
import Dashboard from "../Components/Dashboard/Dashboard";
import Footer from "../Components/Footer/Footer";

const HomePage = () => {
  return (
    <div>
      <NavigationBar />
      <Dashboard />
      <Footer />
    </div>
  );
};

export default HomePage;
