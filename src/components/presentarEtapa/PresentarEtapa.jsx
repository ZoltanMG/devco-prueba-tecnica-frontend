import React, { useState, useEffect } from "react";
import "./presentaretapa.css";

function PresentarEtapa(props) {
  const [etapa, setEtapa] = useState("");
  const [reloadUsers, setReloadUsers] = useState(false);
  const plantilla_preguntas = [
    { numero_pregunta: 1, postulante_id: props.id },
    { numero_pregunta: 2, postulante_id: props.id },
    { numero_pregunta: 3, postulante_id: props.id },
    { numero_pregunta: 4, postulante_id: props.id },
    { numero_pregunta: 5, postulante_id: props.id },
    { numero_pregunta: 6, postulante_id: props.id },
    { numero_pregunta: 7, postulante_id: props.id },
    { numero_pregunta: 8, postulante_id: props.id },
  ];
  const [preguntas, setPreguntas] = useState(plantilla_preguntas)
  useEffect(() => {
    if (props.preguntas.length > 0) {
      setPreguntas(props.preguntas)
    }
  },[preguntas, props])

  useEffect(() => {
    setReloadUsers(false);
  }, [reloadUsers]);

  const enviarEtapa = (e) => {
    const temporal = preguntas;
    const data = temporal.map((item) => {
      item.etapa = etapa;
      return item;
    });
    fetch(`http://172.18.41.163:5000/preguntas`, {
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
  };

  function eliminarPregunta(e) {
    e.preventDefault();
    let temporal = preguntas;
    temporal.pop();
    setPreguntas(temporal);
    setReloadUsers(true);
  }

  function agregarPregunta(e) {
    e.preventDefault();
    let temporal = preguntas;
    let numero_pregunta = preguntas.length + 1;
    temporal.push({
      numero_pregunta: numero_pregunta,
      postulante_id: props.id,
    });
    setPreguntas(temporal);
    setReloadUsers(true);
  }

  function puntos(e, response, i) {
    e.preventDefault();
    let temporal = preguntas;
    const data = temporal.map((item, index) => {
      if (i === index) {
        response === "correcto" ? (item.puntaje = 4) : (item.puntaje = -1);
      }
      return item;
    });
    setPreguntas(data);
    setReloadUsers(true);
  }
  return (
    <div>
      <h3>Preguntas</h3>
      <form onSubmit={enviarEtapa}>
        <input
          onChange={(e) => {
            setEtapa(e.target.value);
          }}
          type="number"
          placeholder="Etapa número..."
          value={props.length > 0 ? etapa: ""}
        />
        {preguntas.map((item, index) => {
          return (
            <div key={index}>
              {preguntas.length === index + 1 && (
                <a
                  href="/"
                  onClick={(e) => {
                    eliminarPregunta(e);
                  }}
                >
                  x
                </a>
              )}
              <h3>Pregunta {item.numero_pregunta}: </h3>
              <h4>
                {item.puntaje && item.puntaje}{" "}
                {item.puntaje && item.puntaje === 4 && "puntos"}
                {item.puntaje && item.puntaje === -1 && "punto"}
              </h4>
              <div>
                <a
                  onClick={(e) => {
                    puntos(e, "correcto", index);
                  }}
                  href="/"
                  className={
                    item.puntaje && item.puntaje === 4
                      ? "btn-correcto__select"
                      : "btn-correcto"
                  }
                >
                  Correcto
                </a>
                <a
                  onClick={(e) => {
                    puntos(e, "incorrecto", index);
                  }}
                  href="/"
                  className={
                    item.puntaje && item.puntaje === -1
                      ? "btn-incorrecto__select"
                      : "btn-incorrecto"
                  }
                >
                  Incorrecto
                </a>
              </div>
              {/* <input type="text" placeholder="Descripcion (Opcional)" /> */}
            </div>
          );
        })}
        <a
          href="/"
          onClick={(e) => {
            agregarPregunta(e);
          }}
        >
          + Agregar pregunta
        </a>
        <br />
        <input type="submit" value="Guardar" />
      </form>
    </div>
  );
}

export default PresentarEtapa;
