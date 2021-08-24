import React from "react";
import "./informacionpostulante.css";

function InformacionPostulante(props) {
  const datos = props.item;
  return (
    <div className="contenedor-info">
      {
        datos.preguntas.map((item, index) => {
          return (
            <div key={index}>
              <h3>Pregunta {item.numero_pregunta}:</h3>
              <h5>{item.puntaje} pts.</h5>
              <label htmlFor="respuesta-descripcion">Descripción:</label>
              <br />
              <textarea name="respuesta-descripcion" id="" cols="50" rows="3" defaultValue={item.descripcion}></textarea>
            </div>
          )
        }
      )}
    </div>
  );
}
export default InformacionPostulante;
