import React, { useState } from "react";
import "./AccessAdmin.css";

const AccessAdmin = () => {
  const [searchValue, setSearchValue] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [users] = useState([
    "12345",
    "67890",
    "11223",
    "44556",
    "78901",
    "23456",
  ]);
  const [branches, setBranches] = useState({
    all: false,
    Dhanmondi: false,
    Gulshan: false,
    Kalabagan: false,
  });
  const [permissions, setPermissions] = useState({
    read: false,
    write: false,
    execute: false,
    admin: false,
    delete: false,
  });

  const handleSearchChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
    setSearchValue(value);

    const matchingUsers = users.filter((user) => user.startsWith(value));
    setFilteredUsers(value ? matchingUsers : []);
  };

  const handleSave = () => {
    alert(`Saved: ${searchValue}`);
  };

  const handlePermissionChange = (e) => {
    const { name, checked } = e.target;
    setPermissions((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleBranchChange = (e) => {
    const { name, checked } = e.target;

    if (name === "all") {
      setBranches((prev) =>
        Object.keys(prev).reduce((acc, branch) => {
          acc[branch] = checked;
          return acc;
        }, {})
      );
    } else {
      setBranches((prev) => ({
        ...prev,
        [name]: checked,
        all: false, // Ensure "ALL Branch" is unchecked when specific branches are selected
      }));
    }
  };

  return (
    <div className="custom-access-admin-container">
      <div className="custom-search-container">
        <label htmlFor="user-search">Search User ID:</label>
        <div className="custom-search-box-wrapper">
          <input
            id="user-search"
            type="text"
            value={searchValue}
            onChange={handleSearchChange}
            placeholder="Enter User ID"
          />
          <button className="custom-save-button" onClick={handleSave}>
            Save
          </button>
        </div>
        {filteredUsers.length > 0 && (
          <ul className="custom-dropdown">
            {filteredUsers.map((user, index) => (
              <li key={index} onClick={() => setSearchValue(user)}>
                {user}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="custom-form-container">
        <div className="custom-form-row">
          <div className="custom-form-group">
            <label htmlFor="name">Name:</label>
            <input id="name" type="text" placeholder="Enter Name" />
          </div>
          <div className="custom-form-group">
            <label htmlFor="user-id">User ID:</label>
            <input id="user-id" type="text" placeholder="Enter User ID" />
          </div>
        </div>
        <div className="custom-form-row">
          <div className="custom-form-group">
            <label htmlFor="mobile-number">Mobile Number:</label>
            <input
              id="mobile-number"
              type="tel"
              pattern="[0-9]{10}"
              placeholder="Enter Mobile Number"
            />
          </div>
          <div className="custom-form-group">
            <label htmlFor="branch-name">Branch Name:</label>
            <select id="branch-name">
              <option value="Dhanmondi">Dhanmondi</option>
              <option value="Gulshan">Gulshan</option>
              <option value="Kalabagan">Kalabagan</option>
            </select>
          </div>
        </div>

        {/* Permissions Section */}
        <div className="custom-permission-section">
          <h3>Permissions</h3>
          <div className="custom-checkbox-group">
            <label>
              <input
                type="checkbox"
                name="read"
                checked={permissions.read}
                onChange={handlePermissionChange}
              />
              Read
            </label>
            <label>
              <input
                type="checkbox"
                name="write"
                checked={permissions.write}
                onChange={handlePermissionChange}
              />
              Write
            </label>
            <label>
              <input
                type="checkbox"
                name="execute"
                checked={permissions.execute}
                onChange={handlePermissionChange}
              />
              Execute
            </label>
            <label>
              <input
                type="checkbox"
                name="admin"
                checked={permissions.admin}
                onChange={handlePermissionChange}
              />
              Admin
            </label>
            <label>
              <input
                type="checkbox"
                name="delete"
                checked={permissions.delete}
                onChange={handlePermissionChange}
              />
              Delete
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessAdmin;
