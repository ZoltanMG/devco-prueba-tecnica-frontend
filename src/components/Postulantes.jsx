import React, { useEffect, useState } from "react";
import PresentarEtapa from "./presentarEtapa/PresentarEtapa";

const fetchURL = "http://172.17.16.132:5000";
const getItems = () => fetch(fetchURL).then((res) => res.json());

function Postulantes() {
  const [items, setItems] = useState();

  useEffect(() => {
    getItems().then((data) => setItems(data.postulantes));
  }, []);

  const eliminarPostulante = (item) => {
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
  };
  return (
    <div>
      <h2>Postulantes</h2>
      {items
        ? items.map((item) => {
          return (
            <div key={item.id}>
              <div>{item.name}</div>
              <button
                onClick={(id) => {
                  eliminarPostulante(item);
                }}
              >
                Remover Postulante
              </button>
              <PresentarEtapa id={item.id} preguntas={item.preguntas}/>
            </div>
          );
        })
        : "Cargando..."}
    </div>
  );
}

export default Postulantes;
