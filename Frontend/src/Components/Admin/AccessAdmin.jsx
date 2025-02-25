import React from "react";
import './AccessAdmin.css';
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook
import { LiaUserShieldSolid } from "react-icons/lia";
import { MdWorkOutline } from "react-icons/md";
import { FaBuilding, FaUserCog } from "react-icons/fa";

const AccessAdmin = () => {
    const navigate = useNavigate(); // Create a navigate function
  // Define the onClick handler for each card to navigate
  const handleCardClick = (cardName) => {
    // Only navigating to the Report Page for now
    if (cardName === "Rules and Permission") {
      navigate("/rulespermission"); // Navigate to the Report page when the Report card is clicked
    } 
    else if (cardName === "Department Setup") {
      navigate("/departmentcreatepage"); // Navigate to the OverView page when the OverView card is clicked
    }
    else if (cardName === "Designation Setup") {
      navigate("/designationcreatepage"); // Navigate to the OverView page when the OverView card is clicked
    }
    else if (cardName === "Employee Approve") {
      navigate("/employeeapprovalpage"); // Navigate to the OverView page when the OverView card is clicked
    }
  };
 
  return (
    <div className="access-admin-page d-flex justify-content-center align-items-center">
      <div className="row w-100">
        {/* Card 1: Rules and Permission */}
        <div className="col-md-4 mb-4">
          <div
            className="card custom-card access-admin-page-card-rules"
            onClick={() => handleCardClick("Rules and Permission")}
          >
            <div className="row g-0">
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">Rules and Permission</h5>
                </div>
              </div>
              <div className="col-md-4 d-flex justify-content-center align-items-center">
                <LiaUserShieldSolid className="card-icon" />
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Designation Setup */}
        <div className="col-md-4 mb-4">
          <div
            className="card custom-card access-admin-page-card-designation"
            onClick={() => handleCardClick("Designation Setup")}
          >
            <div className="row g-0">
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">Designation Setup</h5>
                </div>
              </div>
              <div className="col-md-4 d-flex justify-content-center align-items-center">
                <MdWorkOutline className="card-icon" />
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: Department Setup */}
        <div className="col-md-4 mb-4">
          <div
            className="card custom-card access-admin-page-card-department"
            onClick={() => handleCardClick("Department Setup")}
          >
            <div className="row g-0">
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">Department Setup</h5>
                </div>
              </div>
              <div className="col-md-4 d-flex justify-content-center align-items-center">
                <FaBuilding className="card-icon" />
              </div>
            </div>
          </div>
        </div>
        {/* Card 4: Employee Approve */}
        <div className="col-md-4 mb-4">
          <div
            className="card custom-card access-admin-page-card-approve"
            onClick={() => handleCardClick("Employee Approve")}
          >
            <div className="row g-0">
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">Employee Approve</h5>
                </div>
              </div>
              <div className="col-md-4 d-flex justify-content-center align-items-center">
                <FaUserCog className="card-icon" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessAdmin;