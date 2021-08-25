import React, { useEffect, useState } from "react";
import "./informacionpostulante.css";

function InformacionPostulante(props) {
  // Este componente permite visualizar las respuestas
  // una por una guardadas previamente y también
  // permite actualizarlas de ser necesario
  let datos = props.item;
  const preguntas = datos.preguntas;
  const [reloadUsers, setReloadUsers] = useState(false);
  const etapas = separarEtapas();

  useEffect(() => {
    // Aquí podemos renderizar de nuevo los componenetes
    // al usar el codigo setReloadUsers(true) en otras funciones
    setReloadUsers(false);
  }, [reloadUsers, props]);

  function separarEtapas() {
    // devuelve un array con las preguntas de cada etapa por separado
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

  function puntos(e, response, id) {
    // asigna un valor de 4 o -1 según seleccione “correcto” o “incorrecto”
    e.preventDefault();
    let temporal = preguntas;
    const data = temporal.map((item) => {
      if (id === item.id) {
        response === "correcto" ? (item.puntaje = 4) : (item.puntaje = -1);
      }
      return item;
    });
    datos = data;
    setReloadUsers(true);
  }

  function guardarDescripcion(e, item) {
    // Almacena en cada pregunta el atributo “descripción”
    const preguntasCopy = preguntas;

    const data = preguntasCopy.map((i) => {
      if (i.numero_pregunta === item.numero_pregunta) {
        i.descripcion = e.target.value;
        return i;
      }
      return i;
    });

    datos = data;
  }

  const enviarEtapa = (e) => {
    // envía un Json a la api con los datos a actualizar
    fetch("http://172.29.253.19:5000/preguntas", {
      body: JSON.stringify(preguntas),
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
    });
  };
  return (
    <div className="contenedor-info">
      {etapas.map((item, index) => {
        return (
          <div key={index}>
            <h2>Etapa {item[0].etapa}</h2>
            <form
              onSubmit={enviarEtapa}
              className={etapas.length === 1 ? "contenedor-preguntas-flex" : ""}
            >
              {item.map((itm, idx) => {
                return (
                  <div key={idx}>
                    <div className="contenedor-pregunta-puntos">
                      <h3>Pregunta {itm.numero_pregunta}:</h3>
                      <p>
                        {" "}
                        {itm.puntaje} {itm.puntaje === 4 ? "puntos." : "punto."}
                      </p>
                    </div>
                    <div className="contenedor-btn_actualizar-c-i">
                      <a
                        onClick={(e) => {
                          puntos(e, "correcto", itm.id);
                        }}
                        href="/"
                        className={
                          itm.puntaje === 4
                            ? "btn-respuesta-correcta"
                            : "btn-respuestas grey_correcto"
                        }
                      >
                        Correcta
                      </a>
                      <a
                        onClick={(e) => {
                          puntos(e, "incorrecto", itm.id);
                        }}
                        href="/"
                        className={
                          itm.puntaje === -1
                            ? "btn-respuesta-incorrecta"
                            : "btn-respuestas grey_incorrecto"
                        }
                      >
                        Incorrecta
                      </a>
                    </div>
                    <label htmlFor={"pregunta-" + itm.numero_pregunta}>
                      Descripción:
                    </label>
                    <textarea
                      name={"pregunta-" + itm.numero_pregunta}
                      cols="50"
                      rows="3"
                      onChange={(e) => {
                        guardarDescripcion(e, itm);
                      }}
                      defaultValue={itm.descripcion}
                    ></textarea>
                  </div>
                );
              })}
              <input
                className="btn-actualizar"
                type="submit"
                value="Actualizar"
              />
            </form>
          </div>
        );
      })}
    </div>
  );
}
export default InformacionPostulante;
