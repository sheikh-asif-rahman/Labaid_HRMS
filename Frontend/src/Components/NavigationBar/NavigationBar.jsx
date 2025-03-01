import React, { useState, useEffect } from "react";
import { 
  Container, Nav, Navbar, Offcanvas, NavDropdown, 
  Badge, Dropdown, Modal, Button 
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Bell } from "react-bootstrap-icons";
import axios from "axios";
import "./NavigationBar.css"; // Import the CSS file

const NavigationBar = () => {
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotifications = async () => {
      const userId = localStorage.getItem("userId"); // Get userId from localStorage
      if (!userId) return;

      try {
        const response = await axios.get(`http://localhost:3000/api/notification?userId=${userId}`);
        console.log("Notifications response:", response.data); // Log the response to check the structure
        setNotifications(response.data); // Assuming API returns an array of notifications
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  const handleToggle = () => setShowOffcanvas((prev) => !prev);
  const handleHomePage = () => navigate(`/homepage`);
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate(`/loginpage`);
  };
  const handleChangePassword = () => navigate(`/changepasswordpage`);

  const unreadCount = notifications.length; // All notifications are treated as unread

  const handleNotificationClick = (notification) => {
    setSelectedNotification(notification);
    setShowModal(true);
  };

  return (
    <>
      <Navbar expand="lg" className="navbar-custom" fixed="top">
        <Container>
          <Navbar.Brand onClick={handleHomePage}>LABAID HRMS</Navbar.Brand>
          <Navbar.Toggle aria-controls="offcanvasNavbar" onClick={handleToggle} />
          <Navbar.Collapse id="offcanvasNavbar" className="d-none d-lg-flex">
            <Nav className="ms-auto">
              <Nav.Link onClick={handleHomePage}>Home</Nav.Link>
              <NavDropdown title="Profile" id="profile-dropdown">
                <NavDropdown.Item onClick={handleChangePassword}>Change Password</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout} className="logout-link">Logout</NavDropdown.Item>
              </NavDropdown>
              {/* Notification Dropdown */}
              <Dropdown align="end">
                <Dropdown.Toggle variant="light" className="notification-btn">
                  <Bell size={20} />
                  {unreadCount > 0 && <Badge pill bg="danger">{unreadCount}</Badge>}
                </Dropdown.Toggle>
                <Dropdown.Menu className="notification-dropdown">
                  <div className="notification-list">
                    {notifications.length === 0 ? (
                      <Dropdown.Item>No new notifications</Dropdown.Item>
                    ) : (
                      notifications.map((notification) => (
                        <Dropdown.Item key={notification.EmployeeId} onClick={() => handleNotificationClick(notification)}>
                          <strong>{notification.EmployeeId}</strong> - {notification.Remark}
                        </Dropdown.Item>
                      ))
                    )}
                  </div>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Notification Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Notification</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedNotification ? (
            <>
              <p><strong>EmployeeId:</strong> {selectedNotification.EmployeeId}</p>
              <p><strong>Remark:</strong> {selectedNotification.Remark}</p>
            </>
          ) : (
            "No details available."
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowModal(false)}>OK</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default NavigationBar;
