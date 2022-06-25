import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { NavLink } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
  return (
    <Navbar
      collapseOnSelect
      variant="dark"
      bg="dark"
      className="navbar"
      expand="lg"
    >
      <Container>
        <NavLink className="navbar-brand" to="/">
          Home
        </NavLink>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            <NavLink className="nav-link" to="/about">
              About
            </NavLink>
            <NavLink className="nav-link" to="/basicstrat">
              {" "}
              Strategy{" "}
            </NavLink>
            <NavLink className="nav-link" to="/game">
              Game
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
