import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap styles are imported
import "./DataCard.css"; // Import custom CSS
import axios from "axios"; // Import axios for data fetching

const DataCard = () => {
  const [userType, setUserType] = useState(""); // Selected location
  const [locations, setLocations] = useState([]); // List of locations fetched from API
  const [year, setYear] = useState(new Date().getFullYear()); // Selected year

  // Fetch locations from the API when component mounts
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/locations");
        setLocations(response.data); // Set the locations state with fetched data
        if (response.data.length > 0) setUserType(response.data[0]); // Set default value if data is available
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchLocations();
  }, []);

  // Handle dropdown change
  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };

  // Handle year input change
  const handleYearChange = (e) => {
    const value = e.target.value;
    if (value.length <= 4 && /^[0-9]*$/.test(value)) {
      setYear(value); // Allow only numbers and limit to 4 digits
    }
  };

  // Random data generation for count (not percentage)
  const randomNumber = () => Math.floor(Math.random() * 100);

  return (
    <div className="container mt-5">
      {/* First Section: Current Year Overview */}
      <div className="text-center mb-5">
        <div className="overview-group d-flex justify-content-center align-items-center mb-3">
          {/* Select Location */}
          <div>
            <label htmlFor="userType">Select Location</label>
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

          {/* Year Selection */}
          <div className="ms-3">
            <label htmlFor="yearInput">Enter Year</label>
            <input
              type="number"
              id="yearInput"
              className="form-control"
              placeholder="Year (e.g., 2023)"
              value={year}
              onChange={handleYearChange}
            />
          </div>
        </div>
        <h1 className="data-title mt-4">Today's Overview</h1>
      </div>

      <div className="row">
        {/* Card 1: Attendance */}
        <div className="col-md-4 mb-4">
          <div className="card card-attendance">
            <div className="card-body">
              <p className="card-text">Attendance: {randomNumber()} people</p>
            </div>
          </div>
        </div>

        {/* Card 2: Absence */}
        <div className="col-md-4 mb-4">
          <div className="card card-absence">
            <div className="card-body">
              <p className="card-text">Absences: {randomNumber()} people</p>
            </div>
          </div>
        </div>

        {/* Card 3: Late Attendance */}
        <div className="col-md-4 mb-4">
          <div className="card card-late-attendance">
            <div className="card-body">
              <p className="card-text">
                Late Attendances: {randomNumber()} people
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Second Section: Current Month Overview */}
      <div className="text-center mb-5 mt-5">
        <h1 className="data-title">This Month Overview</h1>
      </div>

      <div className="row">
        {/* Card 1: Attendance */}
        <div className="col-md-4 mb-4">
          <div className="card card-attendance">
            <div className="card-body">
              <p className="card-text">Attendance: {randomNumber()} people</p>
            </div>
          </div>
        </div>

        {/* Card 2: Absence */}
        <div className="col-md-4 mb-4">
          <div className="card card-absence">
            <div className="card-body">
              <p className="card-text">Absences: {randomNumber()} people</p>
            </div>
          </div>
        </div>

        {/* Card 3: Late Attendance */}
        <div className="col-md-4 mb-4">
          <div className="card card-late-attendance">
            <div className="card-body">
              <p className="card-text">
                Late Attendances: {randomNumber()} people
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Third Section: Additional Section (Placeholder for future content) */}
      <div className="text-center mb-5 mt-5">
        <h1 className="data-title">This Year Overview</h1>
      </div>

      <div className="row">
        {/* Card 1: Attendance */}
        <div className="col-md-4 mb-4">
          <div className="card card-attendance">
            <div className="card-body">
              <p className="card-text">Attendance: {randomNumber()} people</p>
            </div>
          </div>
        </div>

        {/* Card 2: Absence */}
        <div className="col-md-4 mb-4">
          <div className="card card-absence">
            <div className="card-body">
              <p className="card-text">Absences: {randomNumber()} people</p>
            </div>
          </div>
        </div>

        {/* Card 3: Late Attendance */}
        <div className="col-md-4 mb-4">
          <div className="card card-late-attendance">
            <div className="card-body">
              <p className="card-text">
                Late Attendances: {randomNumber()} people
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataCard;
