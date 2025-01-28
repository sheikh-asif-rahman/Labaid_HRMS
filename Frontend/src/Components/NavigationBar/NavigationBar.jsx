import { React, useState } from "react";
import { Container, Nav, Navbar, Offcanvas } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./NavigationBar.css";

const NavigationBar = () => {
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const navigate = useNavigate(); // Initialize navigate hook

  const handleToggle = () => setShowOffcanvas((prev) => !prev);
  const handleLinkClick = () => setShowOffcanvas(false); // Close offcanvas on link click

  // Handle logout function
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn"); // Clear login status from localStorage
    navigate(`/loginpage`); // Redirect to login page
  };
  // Handle logout function
  const handleHomePage = () => {
    navigate(`/homepage`); // Redirect to login page
  };

  return (
    <>
      <Navbar expand="lg" className="navbar-custom" fixed="top">
        <Container>
          {/* this is for logo of labaid */}
          <Navbar.Brand onClick={handleHomePage}>LABAID HRMS</Navbar.Brand>
          {/* when screen is small, it will become menu button */}
          <Navbar.Toggle
            aria-controls="offcanvasNavbar"
            onClick={handleToggle}
          />
          {/* we will add all the menu items in it when it is for menu button view */}
          <Navbar.Collapse id="offcanvasNavbar" className="d-none d-lg-flex">
            {/* this is the nav for item to align right side */}
            <Nav className="ms-auto">
              <Nav.Link onClick={handleHomePage}>Home</Nav.Link>
              <Nav.Link onClick={handleLogout} className="logout-link">
                Logout
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <Navbar.Offcanvas
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="end"
            show={showOffcanvas}
            onHide={handleToggle}
            className="d-lg-none" // Only show offcanvas in mobile view
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel">Menu</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link href={`homepage`}>Home</Nav.Link>
                <Nav.Link onClick={handleLogout} className="logout-link">
                  Logout
                </Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
};

export default NavigationBar;
