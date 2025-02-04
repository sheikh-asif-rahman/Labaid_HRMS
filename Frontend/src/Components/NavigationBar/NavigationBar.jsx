import { React, useState } from "react";
import { Container, Nav, Navbar, Offcanvas, NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./NavigationBar.css";

const NavigationBar = () => {
  const [showOffcanvas, setShowOffcanvas] = useState(false);
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

  return (
    <>
      <Navbar expand="lg" className="navbar-custom" fixed="top">
        <Container>
          <Navbar.Brand onClick={handleHomePage}>LABAID HRMS</Navbar.Brand>

          <Navbar.Toggle
            aria-controls="offcanvasNavbar"
            onClick={handleToggle}
          />

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
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
};

export default NavigationBar;
