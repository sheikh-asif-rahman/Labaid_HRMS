import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ReportSearch.css";

const ReportSearch = () => {
  const [locations, setLocations] = useState([]); // List of unique devnm values
  const [userType, setUserType] = useState(""); // Selected location
  const [userId, setUserId] = useState(""); // User ID input
  const [fromDate, setFromDate] = useState(""); // From Date input
  const [toDate, setToDate] = useState(""); // To Date input
  const [fetchedData, setFetchedData] = useState([]); // Data from API
  const [isDataFetched, setIsDataFetched] = useState(false); // Flag to track if data is fetched
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [loadingProgress, setLoadingProgress] = useState(0); // Loading progress percentage
  const [loadingMessage, setLoadingMessage] = useState(""); // Loading message

  // Fetch unique locations on component mount
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/locations");
        setLocations(response.data); // Populate dropdown
        if (response.data.length > 0) setUserType(response.data[0]); // Set default value
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchLocations();

    // Set default date values to the current date
    const currentDate = new Date().toISOString().split("T")[0]; // Format as yyyy-mm-dd
    setFromDate(currentDate);
    setToDate(currentDate);
  }, []);

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
    setUserId(""); // Reset User ID
    setFromDate(new Date().toISOString().split("T")[0]); // Reset From Date to current date
    setToDate(new Date().toISOString().split("T")[0]); // Reset To Date to current date
    setIsDataFetched(false); // Reset data fetched state
    setFetchedData([]); // Clear fetched data
  };

  // Handle Get Data button
  const handleGetData = async () => {
    setIsLoading(true); // Show loading popup
    setLoadingMessage("Fetching data...");
    setLoadingProgress(0);

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
      setLoadingMessage("Failed to fetch data. Please try again.");
    } finally {
      setTimeout(() => {
        setIsLoading(false); // Hide loading popup
      }, 2000); // Give time for user to see final message
    }
  };

  // Convert data to CSV format
  const convertToCSV = (data) => {
    const header = ["Date", "In Time", "Out Time"];
    const rows = data.map((row) => [
      row.date || "N/A",
      row.timeFromDevdt || "N/A",
      row.timeFromDevdtedit || "N/A",
    ]);

    return [header, ...rows].map((row) => row.join(",")).join("\n");
  };

  // Handle Download button
  const handleDownload = async () => {
    setIsLoading(true); // Show progress bar
    setLoadingMessage("Preparing download...");
    setLoadingProgress(0);

    // Simulate progress increment for the download
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return prev;
        }
        return prev + 10;
      });
    }, 200);

    setTimeout(() => {
      const formattedData = fetchedData.map((row) => {
        const date = row.devdt ? formatDate(row.devdt) : "N/A";
        const timeFromDevdt = formatTimeToBangladesh(row.devdt);
        const timeFromDevdtedit = formatTimeToBangladesh(row.devdtedit);

        return { date, timeFromDevdt, timeFromDevdtedit };
      });

      const csvContent = convertToCSV(formattedData);

      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

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

      setLoadingProgress(100); // Set progress to 100% when the download is complete
      setLoadingMessage("Download successful!");
      setTimeout(() => setIsLoading(false), 2000); // Hide loading after 2 seconds
    }, 3000); // Simulate a 3-second delay for the download process
  };

  return (
    <div className="reportsearch-container">
      {/* Fetching Popup */}
      {isLoading && (
        <div className="reportsearch-loading-popup">
          <div className="reportsearch-loading-content">
            <h2>{loadingMessage}</h2>
            <div className="progress">
              <div
                className="progress-bar progress-bar-striped progress-bar-animated"
                style={{ width: `${loadingProgress}%` }}
                role="progressbar"
                aria-valuenow={loadingProgress}
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
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
            {locations.map((location, index) => (
              <option key={index} value={location}>
                {location}
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
            onChange={(e) => setUserId(e.target.value)}
          />
        </div>
      </div>

      <div className="reportsearch-row">
        {/* Second row with From Date and To Date */}
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

      <div className="reportsearch-row">
        {/* Buttons row */}
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
