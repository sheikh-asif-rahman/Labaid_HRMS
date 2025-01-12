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

  // Function to format the time to Bangladesh Time (AM/PM format)
  const formatTimeToBangladesh = (timeString) => {
    if (!timeString) return "N/A";

    const date = new Date(timeString);
    // Convert to Bangladesh Time (UTC +6 hours)
    const options = {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
      timeZone: "Asia/Dhaka", // Bangladesh Time Zone
    };

    const time = date.toLocaleString("en-US", options);
    return time;
  };

  // Function to handle the Reset button
  const handleReset = () => {
    setUserType(locations[0] || ""); // Reset dropdown to the first location
    setUserId(""); // Reset User ID
    setFromDate(new Date().toISOString().split("T")[0]); // Reset From Date to current date
    setToDate(new Date().toISOString().split("T")[0]); // Reset To Date to current date
    setIsDataFetched(false); // Reset data fetched state
  };

  // Function to handle the Get Data button
  const handleGetData = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/report", {
          location: userType,
          userId,
          fromDate,
          toDate,
      });
      setFetchedData(response.data); // Store the fetched data
      setIsDataFetched(true); // Mark data as fetched
      alert("Data fetched successfully!");
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Failed to fetch data. Please try again.");
    }
  };

  // Function to convert the data to CSV format
  const convertToCSV = (data) => {
    const header = ["Date", "In Time", "Out Time"];
    const rows = data.map((row) => [
      row.date || "N/A",
      row.timeFromDevdt || "N/A",
      row.timeFromDevdtedit || "N/A",
    ]);

    const csvContent = [header, ...rows].map((row) => row.join(",")).join("\n");
    return csvContent;
  };

  // Function to handle the Download button click
  const handleDownload = () => {
    // Prepare the data to be downloaded
    const formattedData = fetchedData.map((row) => {
      const date = row.devdt ? formatDate(row.devdt) : "N/A";
      const timeFromDevdt = formatTimeToBangladesh(row.devdt);
      const timeFromDevdtedit = formatTimeToBangladesh(row.devdtedit);

      return { date, timeFromDevdt, timeFromDevdtedit };
    });

    const csvContent = convertToCSV(formattedData);

    // Create a Blob object with CSV content
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

    // Check if the browser supports download attribute
    if (navigator.msSaveBlob) {
      // For Internet Explorer or Edge, use msSaveBlob
      navigator.msSaveBlob(blob, "report.csv");
    } else {
      // For modern browsers, create a temporary <a> link and trigger download
      const link = document.createElement("a");
      if (link.download !== undefined) {
        // For browsers that support the download attribute
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", "report.csv");
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link); // Clean up the DOM
      }
    }
  };

  return (
    <div className="report-search-container">
      <div className="row">
        <div className="col-md-4">
          {/* Dropdown */}
          <div className="form-group">
            <label htmlFor="userType">Select Location</label>
            <select
              className="form-control"
              id="userType"
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
        </div>

        {/* User ID input */}
        <div className="col-md-4">
          <div className="form-group">
            <label htmlFor="userID">User ID</label>
            <input
              type="text"
              className="form-control"
              id="userID"
              placeholder="Enter User ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* From and To Date fields */}
      <div className="row">
        <div className="col-md-4">
          {/* From Date */}
          <div className="form-group">
            <label htmlFor="fromDate">From Date</label>
            <input
              type="date"
              className="form-control"
              id="fromDate"
              name="fromDate"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-4">
          {/* To Date */}
          <div className="form-group">
            <label htmlFor="toDate">To Date</label>
            <input
              type="date"
              className="form-control"
              id="toDate"
              name="toDate"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Get Data and Reset buttons */}
      <div className="row">
        <div className="col-md-4">
          {!isDataFetched ? (
            <button className="download-btn" onClick={handleGetData}>
              Get Data
            </button>
          ) : (
            <button className="download-btn" onClick={handleDownload}>
              Download
            </button>
          )}
        </div>
        <div className="col-md-4">
          <button className="reset-btn" onClick={handleReset}>
            Reset
          </button>
        </div>
      </div>

      {/* Data Table */}
      <div className="row">
        <div className="col-md-12">
          {fetchedData.length > 0 && (
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Date (dd/mm/yyyy)</th>
                  <th>In Time</th>
                  <th>Out Time</th>
                </tr>
              </thead>
              <tbody>
                {fetchedData.map((row, index) => {
                  const date = row.devdt ? formatDate(row.devdt) : "N/A";
                  const timeFromDevdt = formatTimeToBangladesh(row.devdt);
                  const timeFromDevdtedit = formatTimeToBangladesh(
                    row.devdtedit
                  );

                  return (
                    <tr key={index}>
                      <td>{date}</td>
                      <td>{timeFromDevdt}</td>
                      <td>{timeFromDevdtedit}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportSearch;
