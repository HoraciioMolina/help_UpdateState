import React, { Component } from "react";
import { Table, Image, Modal } from "react-bootstrap";
import borrarIndicacion from "../borrarIndicacion";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import ModificarIndicacionModal from "../ModificarIndicacionModal";
import IndicacionImg from "../Resource/IndicacionImg.svg";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import ReactToPrint from "react-to-print";
import NuevaIndicacionForm from "../nuevaIndicacion/nuevaIndicacionForm";
import Grid from "@material-ui/core/Grid";
import "./obtenerIndicaciones.css";

class ObtenerIndicaciones extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      indicaciones: [],
      indicacionABorrar: {},
      indicacionAImprimir: {},
      search: "",
      show: false,
      showImp: false,
      number: 0
    };
    this.areaImprimir = React.createRef();

    this.BorrarIndicacion = this.BorrarIndicacion.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleInputString = this.handleInputString.bind(this);
    this.ConfirmarBorrado = this.ConfirmarBorrado.bind(this);
    this.ConfirmarImprimir = this.ConfirmarImprimir.bind(this);
    this.ImprimirIndicacion = this.ImprimirIndicacion.bind(this);
  }

  componentDidMount() {
      this.loadIndicaciones();
      
    }     

  loadIndicaciones = () => {
    fetch(
      "http://www.pielfagre.somee.com/api/Indicacion/ObtenerTodasIndicaciones"
    )
      .then(respuesta => respuesta.json())
      .then(json => {
        this.setState({
          indicaciones: json
        });
      });
  }



  handleInputString(e) {
    const { name, value } = e.target; //destructurin de los valores enviados por el metodo onchange de cada input
    let regex = new RegExp("^[ñíóáéú a-zA-Z ]+$");
    for (let i = 0; i <= value.length - 1; i++) {
      let letra = value[i];
      if (!regex.test(letra) || !letra === " ") {
        return;
      }
    }
    this.setState({
      [name]: value //al elemento dentro de [] es una key de cada parametro dentro del estado.
    });
  }

  BorrarIndicacion(indicacion) {
    borrarIndicacion(indicacion).then(
      resolve => {
        this.setState({  show: false });
        this.loadIndicaciones();
      },
      reject => {
        alert("No se pudo borrar la indicacion")
      }
    );
  }


  ImprimirIndicacion(nombreDiv) {
    var contenido = document.getElementById(nombreDiv).innerHTML;
    var contenidoOriginal = document.body.innerHTML;
    document.body.innerHTML = contenido;
    window.print();
    document.body.innerHTML = contenidoOriginal;
  }

  ConfirmarBorrado(indicacion) {
    this.setState({ show: true, indicacionABorrar: indicacion });
    
  }

  ConfirmarImprimir(indicacion) {
    this.setState({ showImp: true, indicacionAImprimir: indicacion });
  }

  handleClose() {
    this.setState({ show: false, showImp: false });
  }

  render() {
    let IndicacionesFiltradas = this.state.indicaciones.filter(indicacion => {
      return (
        indicacion.nombre
          .toLowerCase()
          .indexOf(this.state.search.toLowerCase()) !== -1
      );
    });

    return (
      <div>
        <Grid container direction="row" alignItems="baseline">
          <Grid item xs={12}>
            <div className="btn-nuevo">
              <NuevaIndicacionForm
                handleNumber={this.ActualizarComponenteTabla}
              />
            </div>

            <div className="input-search">
              <SearchIcon className="icon-search" />
              <InputBase
                onChange={this.handleInputString}
                name="search"
                placeholder="Buscar por Nombre..."
                inputProps={{ "aria-label": "search" }}
              />
            </div>
          </Grid>
          <Grid item xs={12}>
            <Table
              striped
              bordered
              hover
              variant="light"
              className="table"
              responsive
            >
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nombre</th>
                  <th>Descripcion</th>
                  <th width="200">Accion</th>
                </tr>
              </thead>
              <tbody>
                {IndicacionesFiltradas.map(indicacion => (
                  <tr key={indicacion.id}>
                    <td>{<Image width="50" src={IndicacionImg} />}</td>
                    <td>{indicacion.nombre}</td>
                    <td>{indicacion.descripcion}</td>
                    <td>
                      <div className="buttons-table-wrapper">
                        <Button
                          className="btn-menu-table"
                          variant="contained"
                          color="secondary"
                          onClick={() => this.ConfirmarBorrado(indicacion)}
                          startIcon={<DeleteIcon />}
                        >
                          Eliminar
                        </Button>
                        <ModificarIndicacionModal
                          className="btn-menu-table"
                          indicacion={indicacion}
                          handleNumber={this.ActualizarComponenteTabla}
                        />
                        <Button
                          className="btn-menu-table"
                          variant="contained"
                          color="secondary"
                          onClick={() => this.ConfirmarImprimir(indicacion)}
                        >
                          Imprimir
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Grid>
        </Grid>

        <Modal
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={this.state.show}
          size="sm"
          onHide={this.handleClose}
        >
          <Modal.Header closeButton>Borrar Indicacion</Modal.Header>
          <Modal.Body>
            <p>
              Seguro desea borrar la indicacion{" "}
              {this.state.indicacionABorrar.nombre}?
            </p>
            <hr />
            <div className="d-flex justify-content-end">
              <Button
                onClick={() =>
                  this.BorrarIndicacion(this.state.indicacionABorrar)
                }
                variant="outline-success"
              >
                Si, Borrar.
              </Button>
            </div>
          </Modal.Body>
        </Modal>

        <Modal
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={this.state.showImp}
          size="md"
          onHide={this.handleClose}
        >
          <Modal.Header closeButton>Imprimir Indicacion</Modal.Header>
          <Modal.Body>
            <div className="indicacionAImprimir" ref={this.areaImprimir}>
              <h3>{this.state.indicacionAImprimir.nombre}</h3>
              <h5>{this.state.indicacionAImprimir.descripcion}</h5>
            </div>
            <hr />
            <div className="d-flex justify-content-end">
              <ReactToPrint
                trigger={() => (
                  <Button variant="outline-success">Si, Imprimir.</Button>
                )}
                content={() => this.areaImprimir.current}
              />
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default ObtenerIndicaciones;
