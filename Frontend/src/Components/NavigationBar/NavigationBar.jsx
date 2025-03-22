import React, { useState, useEffect } from "react";
import { 
  Container, Nav, Navbar, Offcanvas, NavDropdown, 
  Badge, Dropdown, Modal, Button 
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Bell } from "react-bootstrap-icons";
import axios from "axios";
import "./NavigationBar.css"; 
import { BASE_URL } from "/src/constants/constant.jsx";

const NavigationBar = () => {
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showReadNotifications, setShowReadNotifications] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    try {
      const response = await axios.get(`${BASE_URL}notification?userId=${userId}`);
      console.log("Notifications response:", response.data);
      setNotifications(response.data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const markNotificationAsRead = async (notification) => {
    if (notification.Readed) {
      setSelectedNotification(notification);
      setShowModal(true);
      return;
    }
  
    try {
      await axios.get(`${BASE_URL}notification?userId=${notification.CreatedBy}&notificationId=${notification.Id}&markRead=true`);
  
      // Update state to mark the specific notification as read
      setNotifications((prevNotifications) =>
        prevNotifications.map((notif) =>
          notif.Id === notification.Id ? { ...notif, Readed: true } : notif
        )
      );
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  
    setSelectedNotification({ ...notification, Readed: true });
    setShowModal(true);
  };
  

  const handleLoadMore = (event) => {
    event.preventDefault();
    event.stopPropagation(); // Prevent dropdown from closing
    setShowReadNotifications(true);
  };

  const handleToggleDropdown = (isOpen) => {
    setShowDropdown(isOpen);
    if (!isOpen) {
      setShowReadNotifications(false); // Reset read notifications when dropdown closes
    }
  };

  const handleHomePage = () => navigate(`/homepage`);
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate(`/loginpage`);
  };
  const handleChangePassword = () => navigate(`/changepasswordpage`);

  const unreadNotifications = notifications.filter((n) => !n.Readed);
  const readNotifications = notifications.filter((n) => n.Readed);
  const unreadCount = unreadNotifications.length;

  return (
    <>
      <Navbar expand="lg" className="navbar-custom" fixed="top">
        <Container>
          <Navbar.Brand onClick={handleHomePage}>LABAID HRMS</Navbar.Brand>
          <Navbar.Toggle onClick={() => setShowOffcanvas(!showOffcanvas)} />
          <Navbar.Offcanvas show={showOffcanvas} onHide={() => setShowOffcanvas(false)} placement="end">
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Menu</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="ms-auto">
                <Nav.Link onClick={handleHomePage}>Home</Nav.Link>
                <NavDropdown title="Profile" id="profile-dropdown">
                  <NavDropdown.Item onClick={handleChangePassword}>Change Password</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout} className="logout-link">Logout</NavDropdown.Item>
                </NavDropdown>
                
                {/* Notification Dropdown */}
                <Dropdown align="end" show={showDropdown} onToggle={handleToggleDropdown}>
                  <Dropdown.Toggle variant="light" className="notification-btn">
                    <Bell size={20} />
                    {unreadCount > 0 && <Badge pill bg="danger">{unreadCount}</Badge>}
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="notification-dropdown">
                    <div className="notification-list">
                      {unreadNotifications.length === 0 && readNotifications.length === 0 ? (
                        <Dropdown.Item>No new notifications</Dropdown.Item>
                      ) : (
                        <>
                          {unreadNotifications.map((notification) => (
                            <Dropdown.Item 
                              key={notification.EmployeeId} 
                              onClick={() => markNotificationAsRead(notification)}
                              className="unread-notification"
                            >
                              <strong>{notification.EmployeeId}</strong> - {notification.Remark}
                            </Dropdown.Item>
                          ))}
                          
                          {showReadNotifications && readNotifications.map((notification) => (
                            <Dropdown.Item 
                              key={notification.EmployeeId} 
                              onClick={() => markNotificationAsRead(notification)}
                              className="read-notification"
                            >
                              <strong>{notification.EmployeeId}</strong> - {notification.Remark}
                            </Dropdown.Item>
                          ))}

                          {!showReadNotifications && readNotifications.length > 0 && (
                            <Dropdown.Item 
                              onClick={handleLoadMore} 
                              className="load-more"
                            >
                              Load More
                            </Dropdown.Item>
                          )}
                        </>
                      )}
                    </div>
                  </Dropdown.Menu>
                </Dropdown>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
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
