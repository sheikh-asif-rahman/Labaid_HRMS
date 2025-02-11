import React, { useState, useEffect } from "react";
import './DesignationCreate.css';

const DesignationCreate = () => {

      const [isModalOpen, setIsModalOpen] = useState(false);
      const handleModalClose = () => {
        setIsModalOpen(false);
        if (fetchSuccess) setShowTable(true); // Show table only if fetching was successful
      };
    
    return (
        <div className="designation-create-container">
          {/* Bubbles in the background */}
          <div className="custom-designation-create-bubbles">
            <div className="custom-designation-create-bubble"></div>
            <div className="custom-designation-create-bubble"></div>
            <div className="custom-designation-create-bubble"></div>
            <div className="custom-designation-create-bubble"></div>
            <div className="custom-designation-create-bubble"></div>
            <div className="custom-designation-create-bubble"></div>
            <div className="custom-designation-create-bubble"></div>
            <div className="custom-designation-create-bubble"></div>
            <div className="custom-designation-create-bubble"></div>
            <div className="custom-designation-create-bubble"></div>
          </div>
      
          {/* Main content and preview table side by side */}
          <div className="row">
            {/* Main content (form) */}
            <div className="col-md-6">
              <div className="custom-designation-create-container">
                <div className="custom-designation-create-form">
                  {/* Title and Report Type Selection */}
                  <div className="custom-designation-create-title custom-designation-create-row">
                    <div className="custom-designation-create-col-md-6">
                    </div>
                  </div>
      
                  <div className="custom-designation-create-form-container">
                    <form>
                      
                    </form>
                  </div>
                </div>
              </div>
            </div>
      
            <div className="col-md-6">
              <div className="custom-designation-create-container">
                <h5>designation List</h5>
              </div>
            </div>
          </div>
      
          {/* Modal */}
          {isModalOpen && (
            <div
              className="custom-designation-create-modal show"
              style={{
                display: "block",
                backdropFilter: "blur(5px)", /* Apply blur effect */
                backgroundColor: "rgba(0, 0, 0, 0.5)", /* Dark overlay with opacity */
              }}
            >
              <div className="custom-designation-create-modal-dialog modal-dialog-centered">
                <div className="custom-designation-create-modal-content">
                  <div className="custom-designation-create-modal-header">
                    <h5 className="custom-designation-create-modal-title">Fetching Data</h5>
                  </div>
                  <div className="custom-designation-create-modal-body">
                    {isFetchingData ? (
                      <div className="custom-designation-create-progress">
                        <div
                          className="custom-designation-create-progress-bar progress-bar-striped progress-bar-animated"
                          style={{ width: "100%" }}
                        ></div>
                      </div>
                    ) : fetchSuccess === null ? (
                      <div className="text-center">Fetching...</div>
                    ) : fetchSuccess ? (
                      <div className="text-center">
                        <p>Data fetched successfully!</p>
                        <button
                          className="btn btn-primary"
                          onClick={handleModalClose}
                        >
                          OK
                        </button>
                      </div>
                    ) : (
                      <div className="text-center">
                        <p>Fetching data failed!</p>
                        <button
                          className="btn btn-danger"
                          onClick={handleModalClose}
                        >
                          OK
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      );
}

export default DesignationCreate;