import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import LinkContainer from "react-router-bootstrap/LinkContainer";
import logo from "./ba-logo.png";
import "./NavBar.css";

export default function NavBar() {
  return (
    <Navbar
      collapseOnSelect
      variant="dark"
      bg="dark"
      className="navbar"
      expand="lg"
    >
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>
            <img src={logo} alt="logo" className="navbar-logo"/>
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            <LinkContainer to="/about">
              <Nav.Link>About</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/basicStrat">
              <Nav.Link>Strategy</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/game">
              <Nav.Link>Game</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
