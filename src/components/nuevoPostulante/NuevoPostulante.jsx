import React, { useState } from "react";
import "./nuevopostulante.css";

function NuevoPostulante() {
  const [nombre, setNombre] = useState("");

  const enviarPostulante = (e) => {
    const data = { nombre: nombre };
    fetch("http://172.24.236.12:5000/postulantes", {
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
  };
  return (
    <div className="contenedor-agregar_postulante">
      <h2>Agregar postulante</h2>
      <form onSubmit={enviarPostulante}>
        <label htmlFor="nombre-postulante">Nombre del postulante:</label>
        <div className="contenedor-input-btn">
          <input
            onChange={(e) => {
              setNombre(e.target.value);
            }}
            type="text"
            placeholder="Nombre..."
            className="input-agregar_postulante"
            name="nombre-postulante"
          />
          <input
            type="submit"
            value="+Agregar"
            className="btn-agregar_postulante"
          />
        </div>
      </form>
    </div>
  );
}

export default NuevoPostulante;
