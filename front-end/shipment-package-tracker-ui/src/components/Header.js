import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

const Header = props => (
    <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">
            <img
                src="./dam_labs_logo.png"
                width="75"
                height="75"
                className="d-inline-block align-content-center"
                alt="React Bootstrap logo"
            />{' '}
            Shipment Tracker
        </Navbar.Brand>
        <Nav>
            <Nav.Link href="/create" variant="dark">New Shipment</Nav.Link>
        </Nav>
    </Navbar>
);

export default Header
