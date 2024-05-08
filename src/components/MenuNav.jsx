import React from "react";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Helper from "../utility/Helper";
import { Link, NavLink } from "react-router-dom";
import images from "../assets/images/shopping-logo.svg";

const MenuNav = () => {
  const logout=()=>{
    sessionStorage.clear();
    window.location.href="/"
  }
return (
<div>
  <Navbar expand="lg" className="bg-body-tertiary shadow-sm  fixed-top   ">
    <Container fluid>
      <Navbar.Brand href="/">
        <img src={images} style={{ width: "80px", height: "80px" }} alt="" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: "100px" }} navbarScroll>
          <NavLink className="nav-link " to="/">
            Home
          </NavLink>
          {Helper.isLogin() && (
          <NavLink className="nav-link " to="/cart-list">
            
            cart-list
          </NavLink>
          )}
        </Nav>

        {Helper.isLogin() ? (
        <button onClick={logout} className="btn btn-danger ">LoginOut</button>
        ) : (
        <Link className="btn btn-success " to='/login'>Login</Link>
        )}
      </Navbar.Collapse>
    </Container>
  </Navbar>
</div>
);
};

export default MenuNav;