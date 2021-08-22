import React, { useEffect, useState } from "react";
import NuevoPostulante from "../nuevoPostulante/NuevoPostulante";
import InformacionPostulante from "../informacionPostulante/InformacionPostulante";
import "./postulantes.css";
// import PresentarEtapa2 from "../presentarEtapa2/PresentarEtapa2";

function Postulantes() {
  const fetchURL = "http://172.17.16.132:5000";
  const getItems = () => fetch(fetchURL).then((res) => res.json());
  const [items, setItems] = useState();
  const [visible, setVisible] = useState(null);

  useEffect(() => {
    getItems().then((data) => setItems(data.postulantes));
  }, []);

  const eliminarPostulante = (e, item) => {
    e.preventDefault();
    const confirmacion = window.confirm(`¿Desea eliminar a ${item.name}?`);
    if (confirmacion === true) {
      fetch(`http://172.17.16.132:5000`, {
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
  function visibleOculto(e, item) {
    e.preventDefault();
    setVisible(item.id);
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
                  <div key={item.id} className="contenedor-postulante">
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
                      <a
                        onClick={(e) => {
                          visibleOculto(e, item);
                        }}
                        className="nueva-etapa"
                        href="/"
                      >
                        Nueva etapa
                      </a>
                    </div>
                    {visible === item.id && (
                      <div>
                        <a onClick={(e) => {
                          e.preventDefault();
                          setVisible(null);
                          }} href="/">X</a>
                        <InformacionPostulante item={item} />
                      </div>
                    )}
                    {/* <PresentarEtapa id={item.id} preguntas={item.preguntas}/> */}
                    {/* <PresentarEtapa2 id={item.id} preguntas={item.preguntas}/> */}
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
