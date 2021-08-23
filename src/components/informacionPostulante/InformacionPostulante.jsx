import React from "react";
import "./informacionpostulante.css";

function InformacionPostulante(props) {
  return (
    <div className="contenedor-info">
      <h2>{props.item.name}</h2>
      
    </div>
  );
}
export default InformacionPostulante;
