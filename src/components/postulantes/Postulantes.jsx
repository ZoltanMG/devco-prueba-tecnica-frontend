import React, { useEffect, useState } from "react";
import NuevoPostulante from "../nuevoPostulante/NuevoPostulante";
import InformacionPostulante from "../informacionPostulante/InformacionPostulante";
import NuevaEtapa from "../nuevaEtapa/NuevaEtapa";
import "./postulantes.css";

function Postulantes() {
  const fetchURL = 'http://172.25.154.245:5000';
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
      fetch('http://172.25.154.245:5000', {
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
  function totalPuntos(item) {
    let totalPuntos = 0;
    item.preguntas.map((item) => {
      totalPuntos = totalPuntos + item.puntaje;
      return item.puntaje;
    });
    return totalPuntos;
  }
  function promedioPuntos(item) {
    let totalPuntos = 0;
    item.preguntas.map((item) => {
      totalPuntos = totalPuntos + item.puntaje;
      return item.puntaje;
    });
    totalPuntos = totalPuntos / item.preguntas.length;
    return totalPuntos.toFixed(1);
  }
  function cerrar(e) {
    e.preventDefault();
    setVisible(null);
  }
  return (
    <main>
      <h1>Sistema de puntuaciones de postulantes</h1>
      <article>
        <section>
          <NuevoPostulante />
        </section>
        <section>
          <h2>Postulantes</h2>
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
                      <div>
                        <p>Promedio: {promedioPuntos(item)} Pts.</p>
                        <p>Total: {totalPuntos(item)} Pts.</p>
                      </div>
                    )}
                    <a
                      onClick={(e) => {
                        visibleOculto(e, item, "nueva-etapa");
                      }}
                      className="nueva-etapa"
                      href="/"
                    >
                      Nueva etapa
                    </a>
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
                      <div>
                        <hr />
                        <a
                          onClick={(e) => {cerrar(e)}}
                          href="/"
                          className="btn-cerrar"
                        >
                          Cerrar
                        </a>
                        <InformacionPostulante item={item} />
                      </div>
                    ) : (
                      <div>
                        <hr />
                        <a
                          onClick={(e) => {cerrar(e)}}
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
