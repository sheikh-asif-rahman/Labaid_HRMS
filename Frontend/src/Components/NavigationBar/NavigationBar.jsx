import React, { useState } from "react";
import { 
  Container, Nav, Navbar, Offcanvas, NavDropdown, 
  Badge, Dropdown, Modal, Button 
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Bell } from "react-bootstrap-icons";
import "./NavigationBar.css"; // Import the CSS file

const NavigationBar = () => {
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, message: "New leave request received.", read: false },
    { id: 2, message: "Your profile has been updated.", read: false },
    { id: 3, message: "Meeting scheduled at 3 PM.", read: false },
    { id: 4, message: "New leave request received.", read: false },
    { id: 5, message: "Your profile has been updated.", read: false },
    { id: 6, message: "Meeting scheduled at 3 PM.", read: false },
  ]);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();
  
  const handleToggle = () => setShowOffcanvas((prev) => !prev);
  const handleLinkClick = () => setShowOffcanvas(false);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate(`/loginpage`);
  };

  const handleChangePassword = () => {
    navigate(`/changepasswordpage`);
  };

  const handleHomePage = () => {
    navigate(`/homepage`);
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleNotificationClick = (notificationId) => {
    const selected = notifications.find((n) => n.id === notificationId);
    setSelectedNotification(selected);
    setShowModal(true);

    // Mark notification as read
    setNotifications((prev) =>
      prev.map((n) =>
        n.id === notificationId ? { ...n, read: true } : n
      )
    );
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
              {/* Profile Dropdown */}
              <NavDropdown title="Profile" id="profile-dropdown">
                <NavDropdown.Item onClick={handleChangePassword}>
                  Change Password
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout} className="logout-link">
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
              {/* Notification Dropdown */}
              <Dropdown align="end">
                <Dropdown.Toggle variant="light" className="notification-btn">
                  <Bell size={20} />
                  {unreadCount > 0 && (
                    <Badge pill bg="danger" className="notification-badge">
                      {unreadCount}
                    </Badge>
                  )}
                </Dropdown.Toggle>

                <Dropdown.Menu className="notification-dropdown">
                  <div className="notification-list">
                    {notifications.length === 0 ? (
                      <Dropdown.Item>No new notifications</Dropdown.Item>
                    ) : (
                      notifications.map((notification) => (
                        <Dropdown.Item
                          key={notification.id}
                          onClick={() => handleNotificationClick(notification.id)}
                          className={notification.read ? "read" : "unread"}
                        >
                          {notification.message}
                        </Dropdown.Item>
                      ))
                    )}
                  </div>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          </Navbar.Collapse>

          <Navbar.Offcanvas
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="end"
            show={showOffcanvas}
            onHide={handleToggle}
            className="d-lg-none"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel">Menu</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link onClick={handleHomePage}>Home</Nav.Link>

                {/* Mobile Profile Dropdown */}
                <NavDropdown title="Profile" id="mobile-profile-dropdown">
                  <NavDropdown.Item onClick={handleChangePassword}>
                    Change Password
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout} className="logout-link">
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
                {/* Notification Dropdown */}
              <Dropdown align="end">
                <Dropdown.Toggle variant="light" className="notification-btn">
                  <Bell size={20} />
                  {unreadCount > 0 && (
                    <Badge pill bg="danger" className="notification-badge">
                      {unreadCount}
                    </Badge>
                  )}
                </Dropdown.Toggle>

                <Dropdown.Menu className="notification-dropdown">
                  <div className="notification-list">
                    {notifications.length === 0 ? (
                      <Dropdown.Item>No new notifications</Dropdown.Item>
                    ) : (
                      notifications.map((notification) => (
                        <Dropdown.Item
                          key={notification.id}
                          onClick={() => handleNotificationClick(notification.id)}
                          className={notification.read ? "read" : "unread"}
                        >
                          {notification.message}
                        </Dropdown.Item>
                      ))
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
          {selectedNotification ? selectedNotification.message : "No message available."}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowModal(false)}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default NavigationBar;
