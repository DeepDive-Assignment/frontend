import React from "react";
import { Container, Navbar } from "react-bootstrap";

const Header = () => {
  return (
    <>
      <Navbar className="" bg="dark">
        <Container>
          <Navbar.Brand className="fs-2 fw-bold text-light text-wrap" href="/">
            TASK MANAGEMENT SYSTEM
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
