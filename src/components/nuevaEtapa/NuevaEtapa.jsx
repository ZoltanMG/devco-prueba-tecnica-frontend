import React, { useState, useEffect } from "react";
import "./nuevaEtapa.css";

function NuevaEtapa(props) {
  const [numeroEtapa, setNumeroEtapa] = useState(1)
  const [preguntas, setPreguntas] = useState([
    { numero_pregunta: 1, postulante_id: props.item.id, etapa: numeroEtapa },
    { numero_pregunta: 2, postulante_id: props.item.id, etapa: numeroEtapa },
    { numero_pregunta: 3, postulante_id: props.item.id, etapa: numeroEtapa },
    { numero_pregunta: 4, postulante_id: props.item.id, etapa: numeroEtapa },
    { numero_pregunta: 5, postulante_id: props.item.id, etapa: numeroEtapa },
    { numero_pregunta: 6, postulante_id: props.item.id, etapa: numeroEtapa },
    { numero_pregunta: 7, postulante_id: props.item.id, etapa: numeroEtapa },
    { numero_pregunta: 8, postulante_id: props.item.id, etapa: numeroEtapa },
  ])

  useEffect(() => {
    let tempNumeroEtapa = 1
    props.item.preguntas.map((item) => {
      if (item.numero_pregunta > tempNumeroEtapa) {
        tempNumeroEtapa = (parseInt(item.etapa) + 1)
      }
      return (tempNumeroEtapa)
    })
    setNumeroEtapa(tempNumeroEtapa)
  }, [props]);

  return (
    <div className="contenedor-nueva-etapa">
      <h2>Etapa {numeroEtapa}</h2>
      <form>
        <div className="contenedor-nuevaetapa__preguntas">
          {
            preguntas.map((item) => {
              return (
                <div key={item.numero_pregunta} className="contenedor-pregunta">
                  <h3>Pregunta {item.numero_pregunta}:</h3>
                  <div className="contenedor-btn-respuestas">
                    <a href="/" className="btn-respuestas correcta">Correcta</a>
                    <a href="/" className="btn-respuestas incorrecta">Incorrecta</a>
                  </div>
                  <label htmlFor={"pregunta-" + item.numero_pregunta}>Descripción (Opcional)</label>
                  <textarea name="" id={"pregunta-" + item.numero_pregunta} cols="50" rows="3"></textarea>
                </div>
              )
            })
          }

        </div>
        <input type="submit" value="Guardar" />
      </form>
    </div>
  );
}

export default NuevaEtapa;
