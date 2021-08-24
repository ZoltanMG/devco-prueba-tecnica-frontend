import React, { useState } from "react";
import './nuevopostulante.css'

function NuevoPostulante() {
    const [nombre, setNombre] = useState("");

    const enviarPostulante = (e) => {
        const data = { nombre: nombre };
        fetch('http://172.24.236.12:5000', {
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
        });
    };
    return (
        <div>
            <h1>Agregar postulante</h1>
            <form onSubmit={enviarPostulante}>
                <input
                    onChange={(e) => {
                        setNombre(e.target.value);
                    }}
                    type="text"
                    placeholder="Nombre"
                    className="input-agregar_postulante"
                />
                <input type="submit" value="Agregar" className="btn-agregar_postulante"/>
            </form>
        </div>
    );
}

export default NuevoPostulante;
