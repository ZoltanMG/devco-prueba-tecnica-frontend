import React from "react";
import Navbar from "./components/navbar/navbar";
import Postulantes from "./components/postulantes/Postulantes";
import "./app.css";

function App() {
  document.title = "Devco | Prueba técnica"
  return (
    <>
      <Navbar />
      <Postulantes />
    </>
  );
}

export default App;
