import React, { Component } from "react";
import ObtenerIndicaciones from "./Get/obtenerIndicaciones";

class ListaIndicaciones extends Component {
  render() {
    return (
      <div className="ListaPacientes">        
        <ObtenerIndicaciones />
      </div>
    );
  }
}

export default ListaIndicaciones;
