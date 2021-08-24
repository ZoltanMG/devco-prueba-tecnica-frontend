import React from "react";
import Logo from "../../assets/imagenes/logo.webp";
import "./navbar.css";

function Navbar() {
  return (
    <nav>
      <a href="/">
        <img src={Logo} alt="logo devco" />
      </a>
    </nav>
  );
}

export default Navbar;
