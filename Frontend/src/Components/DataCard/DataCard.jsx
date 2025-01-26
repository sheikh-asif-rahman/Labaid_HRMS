import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap styles are imported
import "./DataCard.css"; // Import custom CSS
import axios from "axios"; // Import axios for data fetching

const DataCard = () => {
  const [userType, setUserType] = useState(""); // Selected location
  const [locations, setLocations] = useState([]);
  const [branchIds, setBranchIds] = useState([]);
  const [userIds, setUserIds] = useState([]); // State for user IDs

  const currentUserId = localStorage.getItem("userId");

  // Fetch locations from the API when component mounts
  useEffect(() => {
    const fetchLocations = async () => {
      if (currentUserId) {
        try {
          const response = await axios.get(
            `http://localhost:3000/api/reportLocation?UserId=${currentUserId}`
          );
          if (response.data && response.data.length > 0) {
            const branchIdsList = response.data.map((item) => item.BranchId);
            const branchNamesList = response.data.map(
              (item) => item.BranchName
            );

            const separatedBranchNames = branchNamesList.join(",").split(",");
            const separatedBranchIds = branchIdsList.join(",").split(",");

            setBranchIds(separatedBranchIds);
            setLocations(separatedBranchNames);
          }
        } catch (error) {
          console.error("Error fetching report locations:", error);
        }
      }
    };

    fetchLocations();
  }, [currentUserId]);

  // Fetch user IDs when userType changes
  useEffect(() => {
    const fetchUserIds = async () => {
      if (userType) {
        const branchId = branchIds[locations.indexOf(userType)];
        if (branchId) {
          try {
            const response = await axios.get(
              `http://localhost:3000/api/users?ugid=${branchId}`
            );
            const fetchedUserIds = response.data;
            setUserIds(fetchedUserIds);

            // Display the user IDs in an alert box
            if (fetchedUserIds.length > 0) {
              window.alert(`Fetched User IDs: ${fetchedUserIds.join(", ")}`);
            }
          } catch (error) {
            console.error("Error fetching user IDs:", error);
          }
        }
      }
    };

    fetchUserIds();
  }, [userType, branchIds, locations]); // Depend on userType, branchIds, and locations

  // Handle dropdown change
  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };

  // Random data generation for count (not percentage)
  const randomNumber = () => Math.floor(Math.random() * 100);

  return (
    <div className="dashboard-overview container mt-5">
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
              <option value="">Select Location</option>
              {locations.map((location, index) => (
                <option key={index} value={location}>
                  {location}
                </option>
              ))}
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
          <div className="card card-on-leave">
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
