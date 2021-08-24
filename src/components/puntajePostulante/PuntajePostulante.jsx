import React from "react";
import './puntajepostulante.css'

function PuntajePostulante(props) {
  const data = props.item;
  const preguntas = data.preguntas;
  const etapas = separarEtapas();

  function promedioPuntos(item) {
    let totalPuntos = 0;
    item.map((item) => {
      totalPuntos = totalPuntos + item.puntaje;
      return item.puntaje;
    });
    totalPuntos = totalPuntos / item.length;
    return totalPuntos.toFixed(1);
  }

  function totalPuntos(item) {
    let totalPuntos = 0;
    item.map((item) => {
      totalPuntos = totalPuntos + item.puntaje;
      return item.puntaje;
    });
    return totalPuntos;
  }

  function separarEtapas() {
    let allEtapas = [];
    let etapas1 = [];
    let etapas2 = [];
    for (let j in preguntas) {
      if (parseInt(preguntas[j].etapa) === 1) {
        etapas1.push(preguntas[j]);
      } else if (parseInt(preguntas[j].etapa) === 2) {
        etapas2.push(preguntas[j]);
      }
    }
    allEtapas.push(etapas1);
    if (etapas2.length > 0) {
      allEtapas.push(etapas2);
    }
    return allEtapas;
  }
  return (
    <div className="contenedor-puntajes">
      {etapas.map((item, index) => {
        return (
          <div key={index}>
            <h4>Etapa {item[0].etapa}</h4>
            <p>Puntaje total: {totalPuntos(item)} puntos</p>
            <p>Promedio total: {promedioPuntos(item)} puntos</p>
          </div>
        );
      })}
    </div>
  );
}

export default PuntajePostulante;
