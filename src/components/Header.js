import React from 'react';
import { BrowserRouter, Route, Link, NavLink, useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './Header.scss'
const Header = () => {
    return (
        <div className="Header-cotainer"  >
            <Navbar bg="dark" variant="dark" >
                <Container>
                    <Nav className="me-auto">
                        <NavLink className="nav-link" to="/users">Users</NavLink>
                        <NavLink className="nav-link" to="/photos">photos</NavLink>
                    </Nav>
                </Container>
            </Navbar>


        </div>
    );
};

export default Header;