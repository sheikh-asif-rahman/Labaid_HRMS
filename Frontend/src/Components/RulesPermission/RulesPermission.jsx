import React, { useState, useEffect } from "react";
import "./RulesPermission.css";
import { FaSearch } from "react-icons/fa";
import { BASE_URL } from "/src/constants/constant.jsx";


const RulesPermission = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [branches, setBranches] = useState([]);
  const [selectedBranches, setSelectedBranches] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [searchCompleted, setSearchCompleted] = useState(false);

  useEffect(() => {
    fetch(`${BASE_URL}locations`)
      .then((response) => response.json())
      .then((data) => setBranches(data))
      .catch((error) => console.error("Error fetching branches:", error));
  }, []);

  const handleCheckAll = () => {
    setSelectedBranches(branches.map((branch) => branch.id.toString()));
  };

  const handleUncheckAll = () => {
    setSelectedBranches([]);
  };

  const handleCheckboxChange = (id) => {
    setSelectedBranches((prevSelected) =>
      prevSelected.includes(id.toString())
        ? prevSelected.filter((branchId) => branchId !== id.toString())
        : [...prevSelected, id.toString()]
    );
  };

  const handlePermissionChange = (permission) => {
    setPermissions((prevPermissions) =>
      prevPermissions.includes(permission)
        ? prevPermissions.filter((perm) => perm !== permission)
        : [...prevPermissions, permission]
    );
  };

  const handleSearch = () => {
    if (!searchInput) return;
    fetch(
      `${BASE_URL}rulespermissionemployeesearch?userId=${searchInput}`
    )
      .then((response) => response.json())
      .then((data) => {
        setUserId(data.UserId || "");
        setUserName(data.UserName || "");
        setPermissions(data.Permission ? data.Permission.split(",") : []);
        setSelectedBranches(
          data.BranchId ? data.BranchId.split(",").map((id) => id.trim()) : []
        );
        setModalMessage("User Found!");
        setShowModal(true);
      })
      .catch((error) => {
        console.error("Error fetching user permissions:", error);
        setModalMessage("User not found!");
        setShowModal(true);
      });
  };
  const handleSave = () => {
    if (!userId || !userName || selectedBranches.length === 0) {
      console.error("Missing required data!");
      setModalMessage("Missing required data!");
      setShowModal(true);
      return;
    }
  
    const requestData = {
      userId: userId,
      userName: userName,
      permissions: permissions,
      branchId: selectedBranches,
      updatedBy: "AdminUser",
    };
  
    fetch(`${BASE_URL}rulespermissionemployeeupdate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        // Check if the response is OK
        if (!response.ok) {
          // If not OK, try to extract the error message as text
          return response.text().then((text) => {
            throw new Error(text);
          });
        }
        // Check the Content-Type to decide how to parse the response
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
          return response.json();
        } else {
          return response.text();
        }
      })
      .then((data) => {
        console.log("Update successful:", data);
        setModalMessage("Permissions updated successfully!");
        setShowModal(true);
      })
      .catch((error) => {
        console.error("Error updating permissions:", error);
        setModalMessage("Error updating permissions! " + error.message);
        setShowModal(true);
      });
  };
  
  

  return (
    <div className="custom-rules-permission-page">
      <div
        className={`modal fade ${showModal ? "show d-block" : ""}`}
        tabIndex="-1"
        role="dialog"
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content text-center p-4">
            <p>{modalMessage}</p>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                setShowModal(false);
                // For search modal, set searchCompleted so Save & New buttons appear
                if (modalMessage === "User Found!") {
                  setSearchCompleted(true);
                }
              }}
            >
              OK
            </button>
          </div>
        </div>
      </div>

      <div className="custom-rules-permission-bubbles">
        {[...Array(10)].map((_, index) => (
          <div key={index} className="custom-rules-permission-bubble"></div>
        ))}
      </div>

      <div className="custom-rules-permission-container">
        <div className="custom-rules-permission-search-container">
          <label htmlFor="user-search">Search User ID:</label>
          <div className="custom-rules-permission-search-box-wrapper">
            <input
              id="user-search"
              type="text"
              placeholder="Enter User ID"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              disabled={searchCompleted}
            />

            {!searchCompleted && (
              <button
                className="custom-rules-permission-search-button"
                onClick={handleSearch}
              >
                <FaSearch />
              </button>
            )}
            {searchCompleted && (
              <>
                <button
                  className="custom-rules-permission-save-button"
                  onClick={handleSave}
                >
                  Save
                </button>
                <button
                  className="custom-rules-permission-new-button"
                  onClick={() => window.location.reload()}
                >
                  New
                </button>
              </>
            )}
          </div>
        </div>

        <div className="custom-rules-permission-form-container">
          <div className="custom-rules-permission-form-row">
            <div className="custom-rules-permission-form-group">
              <label htmlFor="name">User Name:</label>
              <input
                id="name"
                type="text"
                placeholder="Enter User Name"
                value={userName}
                disabled
              />
            </div>
            <div className="custom-rules-permission-form-group">
              <label htmlFor="user-id">User ID:</label>
              <input
                id="user-id"
                type="text"
                placeholder="Enter User ID"
                value={userId}
                disabled
              />
            </div>
          </div>

          <div className="custom-rules-permission-special-permission">
            <h3>Special Permission</h3>
            <div className="custom-rules-permission-checkbox-group">
              {[
                "Can Access Admin",
                "Can Create New User",
                "Can Edit User Information",
                "Can Edit Holiday Calendar",
                "Can Approve Leave",
              ].map((perm) => (
                <label key={perm}>
                  <input
                    type="checkbox"
                    checked={permissions.includes(perm)}
                    onChange={() => handlePermissionChange(perm)}
                  />
                  {perm}
                </label>
              ))}
            </div>
          </div>

          <div className="custom-rules-permission-branch-access">
            <div className="custom-rules-permission-title">
              <h3>Branch Access for Report</h3>
            </div>
            <div className="custom-rules-permission-buttons">
              <button className="check-all-button" onClick={handleCheckAll}>
                Check All
              </button>
              <button className="uncheck-all-button" onClick={handleUncheckAll}>
                Uncheck All
              </button>
            </div>
          </div>

          <div className="custom-rules-permission-checkbox-group">
            {branches.map((branch) => (
              <label key={branch.id}>
                <input
                  type="checkbox"
                  checked={selectedBranches.includes(branch.id.toString())}
                  onChange={() => handleCheckboxChange(branch.id)}
                />
                {branch.name}
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RulesPermission;
