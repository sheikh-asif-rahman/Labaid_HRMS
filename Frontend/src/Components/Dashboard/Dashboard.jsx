import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap styles
import "./Dashboard.css"; // Custom CSS
import { useNavigate } from "react-router-dom"; // For navigation

// Icons
import {
  BsWrenchAdjustableCircle,
  BsPersonWorkspace,
  BsClipboard2Data,
  BsSuitcase,
} from "react-icons/bs";
import { RiTeamFill } from "react-icons/ri";
import { SiAdblock } from "react-icons/si";
import { SlCalender } from "react-icons/sl";



const Dashboard = () => {
  const navigate = useNavigate();

  const [permission, setPermission] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    // Load and parse permission from localStorage
    const storedPermission = localStorage.getItem("permission");
    if (storedPermission) {
      try {
        const parsedPermission = JSON.parse(storedPermission);
        setPermission(parsedPermission);
      } catch (error) {
        console.error("Error parsing permission:", error);
        setPermission([]);
      }
    }
  }, []);

  // Define the onClick handler for each card to navigate
  const handleCardClick = (cardName) => {
    if (cardName === "Report") {
      navigate("/reportpage"); // Navigate to the Report page
    } else if (cardName === "OverView") {
      navigate("/overviewpage"); // Navigate to the OverView page
    } else if (cardName === "Admin") {
      navigate("/admin"); // Navigate to the Admin page
    } else if (cardName === "Employee") {
      navigate("/employeepage"); // Navigate to the Employee page
    } else if (cardName === "Leave Management") {
      navigate("/leavemanagementpage"); // Navigate to the Employee page
    } else if (cardName === "Holiday Calendar") {
      navigate("/holidaycalander"); // Navigate to the Employee page
    } 
     else if (cardName === "underDevelopmentModal") {
      setModalMessage("Under Development");
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="dashboard-container d-flex justify-content-center align-items-center">
      <div className="row w-100">
        {/* Card 1: Overview */}
        <div className="col-md-4 mb-4">
          <div
            className="card custom-card card-overview"
            onClick={() => handleCardClick("OverView")}
          >
            <div className="row g-0">
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">OverView</h5>
                </div>
              </div>
              <div className="col-md-4 d-flex justify-content-center align-items-center">
                <BsPersonWorkspace className="card-icon" />
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Report */}
        <div className="col-md-4 mb-4">
          <div
            className="card custom-card card-report"
            onClick={() => handleCardClick("Report")}
          >
            <div className="row g-0">
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">Report</h5>
                </div>
              </div>
              <div className="col-md-4 d-flex justify-content-center align-items-center">
                <BsClipboard2Data className="card-icon" />
              </div>
            </div>
          </div>
        </div>

        {/* Conditionally render the Admin card based on permission */}
{permission && Array.isArray(permission) && permission.includes("Can Access Admin") && (
  <div className="col-md-4 mb-4">
    <div
      className="card custom-card card-monitoring"
      onClick={() => handleCardClick("Admin")}
    >
      <div className="row g-0">
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">Admin</h5>
          </div>
        </div>
        <div className="col-md-4 d-flex justify-content-center align-items-center">
          <BsWrenchAdjustableCircle className="card-icon" />
        </div>
      </div>
    </div>
  </div>
)}


        {/* Card 4: Employee */}
        <div className="col-md-4 mb-4">
          <div
            className="card custom-card card-employee"
            onClick={() => handleCardClick("Employee")}
          >
            <div className="row g-0">
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">Employee</h5>
                </div>
              </div>
              <div className="col-md-4 d-flex justify-content-center align-items-center">
                <RiTeamFill className="card-icon" />
              </div>
            </div>
          </div>
        </div>

        {/* Card 5: Leave Management */}
        <div className="col-md-4 mb-4">
          <div
            className="card custom-card card-leave-management"
            onClick={() => handleCardClick("Leave Management")}
          >
            <div className="row g-0">
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">Leave Management</h5>
                </div>
              </div>
              <div className="col-md-4 d-flex justify-content-center align-items-center">
                <BsSuitcase className="card-icon" />
              </div>
            </div>
          </div>
        </div>

        {/* Card 6: Onboarding/Offboarding */}
        <div className="col-md-4 mb-4">
          <div
            className="card custom-card card-employee-onboarding"
            onClick={() => handleCardClick("underDevelopmentModal")}
          >
            <div className="row g-0">
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">Employee Onboarding</h5>
                </div>
              </div>
              <div className="col-md-4 d-flex justify-content-center align-items-center">
                <SiAdblock className="card-icon" />
              </div>
            </div>
          </div>
        </div>

        {/* Card 7: Holiday Calendar */}
        <div className="col-md-4 mb-4">
          <div
            className="card custom-card card-holiday-calendar"
            onClick={() => handleCardClick("Holiday Calendar")}
          >
            <div className="row g-0">
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">Holiday Calendar</h5>
                </div>
              </div>
              <div className="col-md-4 d-flex justify-content-center align-items-center">
                <SlCalender className="card-icon" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <div
        className={`modal fade ${showModal ? "show" : ""}`}
        style={{ display: showModal ? "block" : "none" }}
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body text-center">
              <p>{modalMessage}</p>
              <button
                type="button"
                className="btn btn-primary"
                onClick={closeModal}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
