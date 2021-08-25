import React, { useState, useEffect } from "react";
import "./nuevaEtapa.css";

function NuevaEtapa(props) {
  // este componente permite diligenciar un formulario con los datos de cada etapa
  const [numeroEtapa, setNumeroEtapa] = useState(1);
  const [reloadUsers, setReloadUsers] = useState(false);
  const [preguntasOk, setPreguntasOk] = useState(null);
  const [preguntasErr, setPreguntasErr] = useState("");
  const [preguntas, setPreguntas] = useState([
    { numero_pregunta: 1, postulante_id: props.item.id, etapa: numeroEtapa },
    { numero_pregunta: 2, postulante_id: props.item.id, etapa: numeroEtapa },
    { numero_pregunta: 3, postulante_id: props.item.id, etapa: numeroEtapa },
    { numero_pregunta: 4, postulante_id: props.item.id, etapa: numeroEtapa },
    { numero_pregunta: 5, postulante_id: props.item.id, etapa: numeroEtapa },
    { numero_pregunta: 6, postulante_id: props.item.id, etapa: numeroEtapa },
    { numero_pregunta: 7, postulante_id: props.item.id, etapa: numeroEtapa },
    { numero_pregunta: 8, postulante_id: props.item.id, etapa: numeroEtapa },
  ]);

  useEffect(() => {
    // valida si se presento una etapa o no para determinar
    // sí la etapa actual es la inical o la segunda etapa
    let tempNumeroEtapa = 1;
    props.item.preguntas.map((item) => {
      if (item.etapa >= tempNumeroEtapa) {
        tempNumeroEtapa = parseInt(item.etapa) + 1;
      }
      return tempNumeroEtapa;
    });
    setNumeroEtapa(tempNumeroEtapa);
    setReloadUsers(false);
  }, [reloadUsers, props]);

  const enviarEtapa = (e) => {
    // envía un json con los datos de la etapa a la api
    if (validadorPregunta() === false) {
      e.preventDefault();
      return;
    }
    guardarEtapa();
    fetch("http://172.29.253.19:5000/preguntas", {
      body: JSON.stringify(preguntas),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
  };

  function guardarEtapa() {
    // En cada pregunta almacena el item etapa con la etapa actual
    const datosTemporal = preguntas;
    const datos = datosTemporal.map((item) => {
      item.etapa = numeroEtapa;
      return item;
    });
    setPreguntas(datos);
  }

  function puntos(e, response, i) {
    // asigna un valor de 4 o -1 según seleccione “correcto” o “incorrecto”
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

  function eliminarPregunta(e) {
    // elimina una pregunta
    e.preventDefault();
    let temporal = preguntas;
    temporal.pop();
    setPreguntas(temporal);
    setReloadUsers(true);
  }

  function guardarDescripcion(e, item) {
    // En cada pregunta almacena el item descripción
    const preguntasCopy = preguntas;

    const data = preguntasCopy.map((i) => {
      if (i.numero_pregunta === item.numero_pregunta) {
        i.descripcion = e.target.value;
        return i;
      }
      return i;
    });

    setPreguntas(data);
  }

  function agregarPregunta(e) {
    // agrega una pregunta
    e.preventDefault();
    let temporal = preguntas;
    let numero_pregunta = preguntas.length + 1;
    temporal.push({
      numero_pregunta: numero_pregunta,
      postulante_id: props.item.id,
    });
    setPreguntas(temporal);
    setReloadUsers(true);
  }

  function validadorPregunta() {
    // verifica que se marque correcto o incorrecto en
    //cada una de las preguntas antes de ser enviada a la api
    for (let index in preguntas) {
      if (!preguntas[index].puntaje) {
        setPreguntasOk(false);
        setPreguntasErr(preguntas[index].numero_pregunta);
        return false;
      }
    }
    return true;
  }
  return (
    <div className="contenedor-nueva-etapa">
      <h2 className="etapa-numero">ETAPA {numeroEtapa}</h2>
      <form onSubmit={enviarEtapa}>
        <div className="contenedor-nuevaetapa__preguntas">
          {preguntas.map((item, index) => {
            return (
              <div key={item.numero_pregunta} className="contenedor-pregunta">
                <h3>
                  Pregunta {item.numero_pregunta}
                  {item.puntaje === 4
                    ? ": 4 puntos."
                    : item.puntaje === -1
                      ? ": -1 puntos"
                      : ""}
                </h3>
                <div className="contenedor-btn-respuestas">
                  <a
                    onClick={(e) => {
                      puntos(e, "correcto", index);
                    }}
                    href="/"
                    className={
                      item.puntaje && item.puntaje === 4
                        ? "btn-respuesta-correcta"
                        : "btn-respuestas grey_correcto"
                    }
                  >
                    Correcta
                  </a>
                  <a
                    onClick={(e) => {
                      puntos(e, "incorrecto", index);
                    }}
                    href="/"
                    className={
                      item.puntaje && item.puntaje === -1
                        ? "btn-respuesta-incorrecta"
                        : "btn-respuestas grey_incorrecto"
                    }
                  >
                    Incorrecta
                  </a>
                </div>
                <label htmlFor={"pregunta-" + item.numero_pregunta}>
                  Descripción (Opcional)
                </label>
                <textarea
                  name={"pregunta-" + item.numero_pregunta}
                  cols="50"
                  rows="3"
                  onChange={(e) => {
                    guardarDescripcion(e, item);
                  }}
                ></textarea>
                <br />
                {preguntas.length === index + 1 && (
                  <div className="contenedor-agregar-eliminar-pregunta">
                    <a
                      href="/"
                      onClick={(e) => {
                        eliminarPregunta(e);
                      }}
                      className="eliminar-pregunta"
                    >
                      X Eliminar pregunta
                    </a>
                    <a
                      href="/"
                      onClick={(e) => {
                        agregarPregunta(e);
                      }}
                      className="agregar-pregunta"
                    >
                      + Agregar pregunta
                    </a>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        {preguntasOk === false && (
          <div className="error-ingresar-nombre">
            <p>
              Por favor seleccione “Correcto” o “incorrecto” en la pregunta{" "}
              {preguntasErr}
            </p>
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                setPreguntasOk(null);
              }}
            >
              x
            </a>
          </div>
        )}
        <input className="btn-guardar" type="submit" value="Guardar" />
      </form>
    </div>
  );
}

export default NuevaEtapa;
