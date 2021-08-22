import React, { useState } from "react";

function NuevoPostulante() {
    const [nombre, setNombre] = useState("");

    const enviarPostulante = (e) => {
        const data = { nombre: nombre };
        fetch('http://172.17.16.132:5000', {
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
                />
                <input type="submit" value="Agregar" />
            </form>
        </div>
    );
}

export default NuevoPostulante;
