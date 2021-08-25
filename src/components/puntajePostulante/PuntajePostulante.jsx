import React from "react";
import "./puntajepostulante.css";

function PuntajePostulante(props) {
  // Este componente realiza los cálculos de los promedios y
  // suma total de los puntos
  const data = props.item;
  const preguntas = data.preguntas;
  const etapas = separarEtapas();

  function promedioPuntos(item) {
    // cálcula el primedio de cada etapa del postulante
    let totalPuntos = 0;
    item.map((item) => {
      totalPuntos = totalPuntos + item.puntaje;
      return item.puntaje;
    });
    totalPuntos = totalPuntos / item.length;
    return totalPuntos.toFixed(1);
  }

  function totalPuntos(item) {
    // cálcula la suma total de cada etapa del postulante
    let totalPuntos = 0;
    item.map((item) => {
      totalPuntos = totalPuntos + item.puntaje;
      return item.puntaje;
    });
    return totalPuntos;
  }

  function separarEtapas() {
    // separa las etapas para renderizarlo
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
          <div key={index} className="cont-resultados-etapa">
            <h4>ETAPA {item[0].etapa}</h4>
            <div className="cont-resultados">
              <div className="cont-primedio">
                <h4>Promedio</h4>
                <div className="puntos">
                  <p className="numero-puntos">{promedioPuntos(item)} </p>
                  <p className="texto-puntos">pts.</p>
                </div>
              </div>
              <div className="cont-total">
                <h4>Total</h4>
                <div className="puntos">
                  <p className="numero-puntos">{totalPuntos(item)} </p>
                  <p className="texto-puntos">
                    {totalPuntos(item) === "1" ? "pt." : "pts."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default PuntajePostulante;
