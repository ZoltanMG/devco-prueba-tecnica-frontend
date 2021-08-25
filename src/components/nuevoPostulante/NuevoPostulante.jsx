import React, { useState } from "react";
import "./nuevopostulante.css";

function NuevoPostulante() {
  //este componente envia los datos de un postulante para almacenarlo
  const [nombre, setNombre] = useState("");
  const [nombreDiligenciado, setNombreDiligenciado] = useState(null);

  const enviarPostulante = (e) => {
    // envía un json con los datos del nuevo postulante a la api
    if (nombre === "") {
      e.preventDefault();
      setNombreDiligenciado(false);
      return;
    }
    const data = { nombre: nombre };
    fetch("http://172.29.253.19:5000/postulantes", {
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
        {nombreDiligenciado === false && (
          <div className="error-ingresar-nombre">
            <p>Por favor ingrese un nombre... </p>
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                setNombreDiligenciado(null);
              }}
            >
              x
            </a>
          </div>
        )}
      </form>
    </div>
  );
}

export default NuevoPostulante;
