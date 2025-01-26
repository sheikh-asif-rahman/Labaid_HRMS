import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap styles are imported
import "./Dashboard.css"; // Import custom CSS
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook
// Icons
import {
  BsWrenchAdjustableCircle,
  BsPersonWorkspace,
  BsClipboard2Data,
} from "react-icons/bs";

const Dashboard = () => {
  const navigate = useNavigate(); // Create a navigate function

  // Define the onClick handler for each card to navigate
  const handleCardClick = (cardName) => {
    // Only navigating to the Report Page for now
    if (cardName === "Report") {
      navigate("/reportpage"); // Navigate to the Report page when the Report card is clicked
    } else if (cardName === "OverView") {
      navigate("/overviewpage"); // Navigate to the Report page when the Report card is clicked
    } else if (cardName === "Admin") {
      navigate("/admin"); // Navigate to the Report page when the Report card is clicked
    }
  };

  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="row w-100">
        {/* Card 1 */}
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
                <BsPersonWorkspace size={70} />
              </div>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="col-md-4 mb-4">
          <div
            className="card custom-card card-report"
            onClick={() => handleCardClick("Report")} // Only Report card navigates to the report page
          >
            <div className="row g-0">
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">Report</h5>
                </div>
              </div>
              <div className="col-md-4 d-flex justify-content-center align-items-center">
                <BsClipboard2Data size={70} />
              </div>
            </div>
          </div>
        </div>

        {/* Card 3 */}
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
                <BsWrenchAdjustableCircle size={70} />
              </div>
            </div>
          </div>
        </div>

        {/* Card 4: Employee Directory */}
        <div className="col-md-4 mb-4">
          <div
            className="card custom-card card-employee-directory"
            onClick={() => handleCardClick("")}
          >
            <div className="row g-0">
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">Employee Directory</h5>
                </div>
              </div>
              <div className="col-md-4 d-flex justify-content-center align-items-center">
                <BsClipboard2Data size={70} />
              </div>
            </div>
          </div>
        </div>

        {/* Card 5: Training and Development */}
        <div className="col-md-4 mb-4">
          <div
            className="card custom-card card-training-development"
            onClick={() => handleCardClick("")}
          >
            <div className="row g-0">
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">Training and Development</h5>
                </div>
              </div>
              <div className="col-md-4 d-flex justify-content-center align-items-center">
                <BsClipboard2Data size={70} />
              </div>
            </div>
          </div>
        </div>

        {/* Card 6: Leave & Attendance Tracking */}
        <div className="col-md-4 mb-4">
          <div
            className="card custom-card card-leave-attendance"
            onClick={() => handleCardClick("")}
          >
            <div className="row g-0">
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">Leave & Attendance Tracking</h5>
                </div>
              </div>
              <div className="col-md-4 d-flex justify-content-center align-items-center">
                <BsClipboard2Data size={70} />
              </div>
            </div>
          </div>
        </div>

        {/* Card 7: Onboarding/Offboarding */}
        <div className="col-md-4 mb-4">
          <div
            className="card custom-card card-onboarding-offboarding"
            onClick={() => handleCardClick("")}
          >
            <div className="row g-0">
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">Onboarding - Offboarding</h5>
                </div>
              </div>
              <div className="col-md-4 d-flex justify-content-center align-items-center">
                <BsClipboard2Data size={70} />
              </div>
            </div>
          </div>
        </div>

        {/* Card 8: Performance Reviews */}
        <div className="col-md-4 mb-4">
          <div
            className="card custom-card card-performance-reviews"
            onClick={() => handleCardClick("")}
          >
            <div className="row g-0">
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">Performance Reviews</h5>
                </div>
              </div>
              <div className="col-md-4 d-flex justify-content-center align-items-center">
                <BsClipboard2Data size={70} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
