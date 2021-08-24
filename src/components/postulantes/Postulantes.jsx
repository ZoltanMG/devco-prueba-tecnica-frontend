import React, { useEffect, useState } from "react";
import NuevoPostulante from "../nuevoPostulante/NuevoPostulante";
import InformacionPostulante from "../informacionPostulante/InformacionPostulante";
import PuntajePostulante from "../puntajePostulante/PuntajePostulante";
import NuevaEtapa from "../nuevaEtapa/NuevaEtapa";
import "./postulantes.css";

function Postulantes() {
  const fetchURL = "http://172.24.236.12:5000";
  const getItems = () => fetch(fetchURL).then((res) => res.json());
  const [items, setItems] = useState();
  const [visible, setVisible] = useState(null);
  const [select, setSelect] = useState("");

  useEffect(() => {
    getItems().then((data) => setItems(data.postulantes));
  }, []);

  const eliminarPostulante = (e, item) => {
    e.preventDefault();
    const confirmacion = window.confirm(`¿Desea eliminar a ${item.name}?`);
    if (confirmacion === true) {
      fetch("http://172.24.236.12:5000/postulantes", {
        body: JSON.stringify(item.id),
        headers: {
          "Content-Type": "application/json",
        },
        method: "DELETE",
      });
      setItems(
        items.filter(function (i) {
          return i.id !== item.id;
        })
      );
    }
  };
  function visibleOculto(e, item, seleccion) {
    e.preventDefault();
    setVisible(item.id);
    setSelect(seleccion);
  }
  function cerrar(e) {
    e.preventDefault();
    setVisible(null);
  }

  function valideEtapa2(item) {
    for (let index in item.preguntas) {
      if (item.preguntas[index].etapa === "2") {
        return false;
      }
    }
    return true;
  }
  return (
    <main>
      <h1>SISTEMA DE PUNTUACIÓN DE POSTULANTES</h1>
      <article>
        <section>
          <NuevoPostulante />
        </section>
        <section className="contenido">
          <h2 className="etapa-numero">POSTULANTES</h2>
          {items
            ? items.map((item) => {
                return (
                  <div
                    key={item.id}
                    className={
                      visible === item.id
                        ? "contenedor-postulante select"
                        : "contenedor-postulante"
                    }
                  >
                    <div className="subcontenedor-postulante">
                      <div className="nombre-postulante">
                        <a
                          onClick={(e, id) => {
                            eliminarPostulante(e, item);
                          }}
                          href="/"
                          className="btn-eliminar-postulante"
                        >
                          x
                        </a>
                        <p>{item.name}</p>
                      </div>
                      {item.preguntas.length > 0 && (
                        <PuntajePostulante item={item} />
                      )}
                      {valideEtapa2(item) && (
                        <a
                          onClick={(e) => {
                            visibleOculto(e, item, "nueva-etapa");
                          }}
                          className="nueva-etapa"
                          href="/"
                        >
                          {item.preguntas.length === 0
                            ? "Primera etapa"
                            : "Segunda etapa"}
                        </a>
                      )}

                      {item.preguntas.length > 0 && (
                        <a
                          onClick={(e) => {
                            visibleOculto(e, item, "ver-mas");
                          }}
                          className="ver-mas"
                          href="/"
                        >
                          Ver más
                        </a>
                      )}
                    </div>
                    {visible === item.id &&
                      (select === "ver-mas" ? (
                        <div className="contenedor-infos">
                          <a
                            onClick={(e) => {
                              cerrar(e);
                            }}
                            href="/"
                            className="btn-cerrar"
                          >
                            Cerrar
                          </a>
                          <InformacionPostulante item={item} />
                        </div>
                      ) : (
                        <div className="contenedor-infos">
                          <a
                            onClick={(e) => {
                              cerrar(e);
                            }}
                            href="/"
                            className="btn-cerrar"
                          >
                            Cerrar
                          </a>
                          <NuevaEtapa item={item} />
                        </div>
                      ))}
                  </div>
                );
              })
            : "Cargando..."}
        </section>
      </article>
    </main>
  );
}

export default Postulantes;
