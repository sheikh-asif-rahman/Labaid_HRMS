import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"; // Make sure Bootstrap is imported
import "./ReportSearch.css";

const ReportSearch = () => {
  const currentUserId = localStorage.getItem("userId");

  const [locations, setLocations] = useState([]); // List of unique devnm values (Branch Name)
  const [branchIds, setBranchIds] = useState([]); // List of Branch IDs
  const [userType, setUserType] = useState(""); // Selected location
  const [userId, setUserId] = useState(""); // Selected User ID (initially empty)
  const [userIds, setUserIds] = useState([]); // List of User IDs
  const [userIdSuggestions, setUserIdSuggestions] = useState([]); // Suggestions for User IDs
  const [fromDate, setFromDate] = useState(""); // From Date input
  const [toDate, setToDate] = useState(""); // To Date input
  const [fetchedData, setFetchedData] = useState([]); // Data from API
  const [isDataFetched, setIsDataFetched] = useState(false); // Flag to track if data is fetched
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [loadingProgress, setLoadingProgress] = useState(0); // Loading progress percentage
  const [loadingMessage, setLoadingMessage] = useState(""); // Loading message

  // States for download progress
  const [downloadProgress, setDownloadProgress] = useState(0); // Track download progress
  const [isDownloading, setIsDownloading] = useState(false); // Flag to track if download is in progress

  // States to control the modal visibility
  const [isModalVisible, setIsModalVisible] = useState(false); // Control the visibility of the modal
  const [modalMessage, setModalMessage] = useState(""); // Modal message to be displayed

  // Fetch locations and user IDs on component mount
  // Fetch locations and user IDs on component mount
  useEffect(() => {
    const fetchLocations = async () => {
      if (currentUserId) {
        try {
          const response = await axios.get(
            `http://localhost:3000/api/reportLocation?UserId=${currentUserId}`
          );

          if (response.data && response.data.length > 0) {
            // Separate Branch Names and Branch IDs into individual arrays
            const branchIdsList = response.data.map((item) => item.BranchId);
            const branchNamesList = response.data.map(
              (item) => item.BranchName
            );

            // Now, store locations and branchIds as separate arrays with comma-separated values
            setBranchIds(branchIdsList);
            setLocations(branchNamesList.join(",").split(",")); // Join all branch names with a comma and then split into an array

            // Add the alert/console log here to check the data
            console.log("Locations:", branchNamesList);
            console.log("Branch IDs:", branchIdsList);
          }
        } catch (error) {
          console.error("Error fetching report locations:", error);
        }
      }
    };

    const fetchUserIds = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/users");
        setUserIds(response.data); // Populate User ID dropdown
      } catch (error) {
        console.error("Error fetching user IDs:", error);
      }
    };

    fetchLocations();
    fetchUserIds();

    // Set default date values to the current date
    const currentDate = new Date().toISOString().split("T")[0]; // Format as yyyy-mm-dd
    setFromDate(currentDate);
    setToDate(currentDate);
  }, [currentUserId]); // Re-run useEffect when currentUserId changes

  // Format date to dd/mm/yyyy
  const formatDate = (date) => {
    if (!date) return "N/A";
    const newDate = new Date(date);
    const day = newDate.getDate().toString().padStart(2, "0");
    const month = (newDate.getMonth() + 1).toString().padStart(2, "0");
    const year = newDate.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Format time to Bangladesh Time (AM/PM format)
  const formatTimeToBangladesh = (timeString) => {
    if (!timeString) return "N/A";

    const date = new Date(timeString);
    const options = {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
      timeZone: "Asia/Dhaka", // Bangladesh Time Zone
    };

    return date.toLocaleString("en-US", options);
  };

  // Handle Reset button
  const handleReset = () => {
    setUserType(locations[0] || ""); // Reset dropdown to the first location
    setUserId(""); // Reset User ID to empty
    setFromDate(new Date().toISOString().split("T")[0]); // Reset From Date to current date
    setToDate(new Date().toISOString().split("T")[0]); // Reset To Date to current date
    setIsDataFetched(false); // Reset data fetched state
    setFetchedData([]); // Clear fetched data
    setUserIdSuggestions([]); // Clear User ID suggestions
  };

  // Handle Get Data button
  const handleGetData = async () => {
    setIsLoading(true); // Show loading modal
    setLoadingMessage("Fetching data...");
    setLoadingProgress(0);
    setIsModalVisible(true); // Show the modal

    try {
      // Simulate progress increment
      const interval = setInterval(() => {
        setLoadingProgress((prev) => {
          if (prev >= 90) {
            clearInterval(interval);
            return prev;
          }
          return prev + 10;
        });
      }, 200);

      const response = await axios.post("http://localhost:3000/api/report", {
        location: userType,
        userId,
        fromDate,
        toDate,
      });

      setFetchedData(response.data); // Store the fetched data
      setIsDataFetched(true); // Mark data as fetched
      setLoadingProgress(100); // Set progress to 100%
      setLoadingMessage("Data fetched successfully!");
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoadingProgress(100); // Set progress to 100%
      setLoadingMessage("Failed to fetch data. Please try again.");
    } finally {
      setTimeout(() => {
        setIsLoading(false); // Hide loading modal
      }, 2000); // Give time for user to see final message
    }
  };

  // Convert data to CSV format
  const convertToCSV = (data) => {
    const header = [
      "SL",
      "Branch Name",
      "User ID",
      "Date",
      "In Time",
      "Out Time",
    ];
    const rows = data.map((row, index) => [
      index + 1, // SL number
      userType || "N/A", // Branch name (selected location)
      userId || row.user_id || "N/A", // User ID from frontend or from query result
      row.date || "N/A", // Date
      row.timeFromDevdt || "N/A", // In Time
      row.timeFromDevdtedit || "N/A", // Out Time
    ]);

    return [header, ...rows].map((row) => row.join(",")).join("\n");
  };

  // Handle User ID input change to show suggestions
  const handleUserIdChange = (e) => {
    const value = e.target.value;
    setUserId(value);

    // Show suggestions based on the input value
    if (value) {
      const suggestions = userIds.filter((id) =>
        id.toLowerCase().startsWith(value.toLowerCase())
      );
      setUserIdSuggestions(suggestions);
    } else {
      setUserIdSuggestions([]); // Clear suggestions if input is empty
    }
  };

  // Handle suggestion selection
  const handleSuggestionClick = (suggestion) => {
    setUserId(suggestion);
    setUserIdSuggestions([]); // Clear suggestions after selection
  };

  // Handle Download button
  const handleDownload = () => {
    setIsDownloading(true); // Show downloading modal
    setDownloadProgress(0);

    // Simulate the CSV generation process with progress updates
    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return prev;
        }
        return prev + 10; // Increment progress
      });
    }, 500); // Update progress every 500ms

    // Simulate delay before the CSV download
    setTimeout(() => {
      const formattedData = fetchedData.map((row) => {
        const date = row.devdt ? formatDate(row.devdt) : "N/A";
        const timeFromDevdt = formatTimeToBangladesh(row.devdt);
        const timeFromDevdtedit = formatTimeToBangladesh(row.devdtedit);

        return { date, timeFromDevdt, timeFromDevdtedit, user_id: row.user_id };
      });

      const csvContent = convertToCSV(formattedData);
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

      // Trigger download
      if (navigator.msSaveBlob) {
        navigator.msSaveBlob(blob, "report.csv");
      } else {
        const link = document.createElement("a");
        if (link.download !== undefined) {
          const url = URL.createObjectURL(blob);
          link.setAttribute("href", url);
          link.setAttribute("download", "report.csv");
          link.style.visibility = "hidden";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      }

      // Reset the progress and download flag after download
      setDownloadProgress(100);
      setTimeout(() => {
        setIsDownloading(false); // Hide progress bar after download
      }, 1000);
    }, 2000); // Simulate a 2-second delay for the download process
  };

  return (
    <div className="reportsearch-container">
      {/* Fetching Popup */}
      {isModalVisible && (
        <div
          className="modal fade show"
          tabIndex="-1"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
          aria-labelledby="fetchingDataModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="fetchingDataModalLabel">
                  Data Fetching
                </h5>
              </div>
              <div className="modal-body">
                {loadingProgress < 100 ? (
                  <>
                    <div className="progress" style={{ height: "20px" }}>
                      <div
                        className="progress-bar progress-bar-striped progress-bar-animated"
                        style={{ width: `${loadingProgress}%` }}
                      ></div>
                    </div>
                    <p>{loadingMessage}</p>
                  </>
                ) : (
                  <>
                    <p>{loadingMessage}</p>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => setIsModalVisible(false)} // Close modal on button click
                    >
                      OK
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Downloading Popup */}
      {isDownloading && (
        <div
          className="modal fade show"
          tabIndex="-1"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
          aria-labelledby="downloadingDataModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="downloadingDataModalLabel">
                  Downloading CSV
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="progress" style={{ height: "20px" }}>
                  <div
                    className="progress-bar progress-bar-striped progress-bar-animated"
                    style={{ width: `${downloadProgress}%` }}
                  ></div>
                </div>
                <p>Downloading CSV...</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Form */}
      <div className="reportsearch-row">
        {/* First row with Location and User ID */}
        <div className="reportsearch-col-md-6">
          <label htmlFor="userType" className="reportsearch-label">
            Location
          </label>
          <select
            id="userType"
            className="reportsearch-select form-control"
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
          >
            {/* Map over the locations array to render each location */}
            {locations.map((location, index) => (
              <option key={index} value={location}>
                {location} {/* Display the location name */}
              </option>
            ))}
          </select>
        </div>

        <div className="reportsearch-col-md-6">
          <label htmlFor="userId" className="reportsearch-label">
            User ID
          </label>
          <input
            id="userId"
            className="reportsearch-input"
            type="text"
            value={userId}
            onChange={handleUserIdChange}
            placeholder="Start typing User ID..."
          />
          {/* Display suggestions */}
          {userIdSuggestions.length > 0 && (
            <ul className="suggestions-list">
              {userIdSuggestions.map((suggestion, index) => (
                <li
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Second row with Date Inputs */}
      <div className="reportsearch-row">
        <div className="reportsearch-col-md-6">
          <label htmlFor="fromDate" className="reportsearch-label">
            From Date
          </label>
          <input
            id="fromDate"
            className="reportsearch-input"
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
        </div>

        <div className="reportsearch-col-md-6">
          <label htmlFor="toDate" className="reportsearch-label">
            To Date
          </label>
          <input
            id="toDate"
            className="reportsearch-input"
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="reportsearch-row">
        <div className="reportsearch-col-md-4">
          {!isDataFetched ? (
            <button
              className="reportsearch-get-data-btn reportsearch-btn"
              onClick={handleGetData}
            >
              Get Data
            </button>
          ) : (
            <button
              className="reportsearch-download-btn reportsearch-btn"
              onClick={handleDownload}
            >
              Download CSV
            </button>
          )}
        </div>

        <div className="reportsearch-col-md-4">
          <button
            className="reportsearch-reset-btn reportsearch-btn"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportSearch;
