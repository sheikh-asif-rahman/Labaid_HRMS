import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap styles are imported
import "./DataCard.css"; // Import custom CSS
import axios from "axios"; // Import axios for data fetching

const DataCard = () => {
  const [userType, setUserType] = useState(""); // Selected location
  const [locations, setLocations] = useState([]); // List of locations fetched from API

  // Fetch locations from the API when component mounts
  useEffect(() => {
    const fetchLocations = async () => {
      // try {
      //   const response = await axios.get("http://localhost:3000/api/locations");
      //   setLocations(response.data); // Set the locations state with fetched data
      //   if (response.data.length > 0) setUserType(response.data[0]); // Set default value if data is available
      // } catch (error) {
      //   console.error("Error fetching locations:", error);
      // }
    };

    fetchLocations();
  }, []);

  // Handle dropdown change
  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };

  // Random data generation for count (not percentage)
  const randomNumber = () => Math.floor(Math.random() * 100);

  return (
    <div className="container mt-5">
      {/* First Section: Current Year Overview */}
      <div className="text-center mb-5">
        <h1 className="data-title mt-4">Today's Overview</h1>

        {/* Select Location */}
        <div className="overview-group d-flex justify-content-center align-items-center mt-4">
          <div>
            <select
              className="form-control"
              id="userType"
              value={userType}
              onChange={handleUserTypeChange}
            >
              {locations.length > 0 ? (
                locations.map((location, index) => (
                  <option key={index} value={location}>
                    {location}
                  </option>
                ))
              ) : (
                <option>Loading locations...</option>
              )}
            </select>
          </div>
        </div>
      </div>

      {/* Card Section */}
      <div className="row">
        {/* Card 1: Attendance */}
        <div className="col-md-6 mb-4">
          <div className="card card-attendance">
            <div className="card-body">
              <p className="card-title">Attendance</p>
              <p className="card-text">{randomNumber()} people</p>
            </div>
          </div>
        </div>

        {/* Card 2: Absence */}
        <div className="col-md-6 mb-4">
          <div className="card card-absence">
            <div className="card-body">
              <p className="card-title">Absence</p>
              <p className="card-text">{randomNumber()} people</p>
            </div>
          </div>
        </div>

        {/* Card 3: Late Attendance */}
        <div className="col-md-6 mb-4">
          <div className="card card-late-attendance">
            <div className="card-body">
              <p className="card-title">Late Attendance</p>
              <p className="card-text">{randomNumber()} people</p>
            </div>
          </div>
        </div>

        {/* Card 4: On Leave */}
        <div className="col-md-6 mb-4">
          <div
            className="card card-on-leave"
            style={{ backgroundColor: "#66cc66", color: "white" }}
          >
            <div className="card-body">
              <p className="card-title">On Leave</p>
              <p className="card-text">{randomNumber()} people</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataCard;
