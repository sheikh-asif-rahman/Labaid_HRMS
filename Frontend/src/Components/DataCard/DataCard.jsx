import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap styles are imported
import "./DataCard.css"; // Import custom CSS
import axios from "axios"; // Import axios for data fetching
import { BASE_URL } from "/src/constants/constant.jsx";

const DataCard = () => {
  const [userType, setUserType] = useState(""); // Selected location
  const [locations, setLocations] = useState([]);
  const [branchIds, setBranchIds] = useState([]);
  const [userIds, setUserIds] = useState([]); // State for user IDs
  const [userData, setUserData] = useState({ total: 0, present: 0, absent: 0 });
  const [loading, setLoading] = useState(false); // To handle loading state

  const currentUserId = localStorage.getItem("userId");

  // Fetch locations from the API when component mounts
  useEffect(() => {
    const fetchLocations = async () => {
      if (currentUserId) {
        setLoading(true); // Show loading spinner
        try {
          const response = await axios.get(
            `${BASE_URL}/reportLocation?UserId=${currentUserId}`
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
        } finally {
          setLoading(false); // Hide loading spinner after data is fetched
        }
      }
    };

    fetchLocations();
  }, [currentUserId]);

  // Fetch user status data when userType changes
  useEffect(() => {
    const fetchUserData = async () => {
      if (userType) {
        setLoading(true); // Show loading spinner
        const branchId = branchIds[locations.indexOf(userType)];
        if (branchId) {
          try {
            const response = await axios.get(
              `${BASE_URL}/overViewOne?devid=${branchId}`
            );
            const fetchedData = response.data;
            if (fetchedData && fetchedData.length > 0) {
              // Calculate total, present, and absent counts
              const total = fetchedData.length;
              const present = fetchedData.filter(
                (user) => user.status === "Present"
              ).length;
              const absent = total - present;

              setUserData({
                total,
                present,
                absent,
              });
            }
          } catch (error) {
            console.error("Error fetching user data:", error);
          } finally {
            setLoading(false); // Hide loading spinner after data is fetched
          }
        }
      }
    };

    fetchUserData();
  }, [userType, branchIds, locations]); // Depend on userType, branchIds, and locations

  // Handle dropdown change
  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };

  return (
    <div className="dashboard-overview container mt-5">
      {/* Modal to show loading spinner */}
      <div
        className={`modal fade ${loading ? "show" : ""}`}
        style={{ display: loading ? "block" : "none" }}
        tabIndex="-1"
        role="dialog"
        aria-hidden={!loading}
      >
        <div
          className="modal-dialog modal-dialog-centered"
          role="document"
          style={{ maxWidth: "200px", width: "200px", height: "200px" }} // Make modal square and smaller
        >
          <div className="modal-content">
            <div className="modal-body text-center">
              {/* Circular spinner only */}
              <div className="spinner-border text-primary" role="status"></div>
            </div>
          </div>
        </div>
      </div>

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
        {/* Card 1: Total Employees */}
        <div className="col-md-4 mb-4">
          <div className="card card-total-employees">
            <div className="card-body">
              <p className="card-title">Total Employees</p>
              <p className="card-text">{userData.total} people</p>
            </div>
          </div>
        </div>

        {/* Card 2: Present */}
        <div className="col-md-4 mb-4">
          <div className="card card-present">
            <div className="card-body">
              <p className="card-title">Present</p>
              <p className="card-text">{userData.present} people</p>
            </div>
          </div>
        </div>

        {/* Card 3: Absence */}
        <div className="col-md-4 mb-4">
          <div className="card card-absence">
            <div className="card-body">
              <p className="card-title">Absence</p>
              <p className="card-text">{userData.absent} people</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataCard;
