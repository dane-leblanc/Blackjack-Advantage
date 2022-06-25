import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import "./NavBar.css";

function NavBar() {
  return (
    <Navbar variant="dark" bg="dark" className="navbar" expand="lg">
      <Container>
        <Navbar.Brand href="/">Home</Navbar.Brand>
        <Nav>
          <Nav.Link href="/about">About</Nav.Link>
          <Nav.Link href="/game">Game</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavBar;
