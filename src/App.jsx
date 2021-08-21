import React from "react";
import NuevoPostulante from "./components/NuevoPostulante";
import Postulantes from "./components/Postulantes";
import "./app.css";
import Logo from "./img/logo.webp";

function App() {
  return (
    <main>
      <nav className="navbar">
        <a href="/">
          <img src={Logo} alt="logo devco" />
        </a>
      </nav>
      <h1>Sistema de puntuaciones de postulantes</h1>
      <NuevoPostulante />
      <Postulantes />
    </main>
  );
}

export default App;
