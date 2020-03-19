import React, { Component } from "react";
import { Form, Button, Modal, Row, Col } from "react-bootstrap";
import registrarIndicacion from "./registrarIndicacion";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import TextField from "@material-ui/core/TextField";
import LinearProgress from "@material-ui/core/LinearProgress";

class NuevaIndicacionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nombre: "",
      descripcion: "",
      estaBorrado: false,
      number: 0,
      show: false,
      isLoading: false
    };
    this.handleInputString = this.handleInputString.bind(this);
    this.postNuevaIndicacion = this.postNuevaIndicacion.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleNumber = this.handleNumber.bind(this);
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
     ;
  }

  handleInput(e) {
    this.setState({ [e.target.name]: e.target.value });
     
  }

  postNuevaIndicacion() {
    this.setState({isLoading : true})
    registrarIndicacion(this.state).then(      
      resolve => {
        alert("La indicacion se creo con exito")
        
        this.setState({...this.state, show: false , number: this.state.number + 1, isLoading: false});
      },
      reject => {}
    );
     
  }

  handleNumber() {
    this.setState({ number: this.state.number + 1, show: false });
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  render() {
    const isEnabled = this.state.nombre.length > 0;

    return (
      <div className="nuevaIndicacionForm">
        <Button variant="outline-success" onClick={this.handleShow}>
          Nueva Indicacion
        </Button>

        <Modal size="md" show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Nueva Indicacion</Modal.Title>
          </Modal.Header>
          <div
            className="nuevaIndicacionFormBody"
            onSubmit={this.postNuevaIndicacion}
            onSubmitCapture={this.props.handleNumber}
          >
            <ValidatorForm noValidate autoComplete="off">
              <Form>
                <Modal.Body>
                  <Form.Row>
                    <Col>
                      <TextValidator
                        fullWidth
                        validators={["required"]}
                        errorMessages={["El campo es obligatorio"]}
                        name="nombre"
                        label="Nombre*"
                        value={this.state.nombre}
                        onChange={this.handleInput}
                        type="text"
                        margin="normal"
                        variant="outlined"
                      />
                    </Col>
                  </Form.Row>
                  <Form.Row>
                    <Col>
                      <TextField
                        fullWidth
                        label="Descripcion"
                        name="descripcion"
                        rows="10"
                        multiline
                        onChange={this.handleInput}
                        value={this.state.descripcion}
                        margin="normal"
                        variant="outlined"
                      />
                    </Col>
                  </Form.Row>

                  <div class="form-group row">
                    <Col>
                      <div class="col text-center">
                        <br></br>
                        <Button
                          variant="danger"
                          onClick={this.handleClose}
                          block
                        >
                          Cancelar
                        </Button>
                      </div>
                    </Col>
                    <Col>
                      <Row>
                        <div class="col text-center">
                          <br></br>
                          <Button variant="primary" disabled={!isEnabled || this.state.isLoading} type="submit" block>
                            Guardar
                          </Button>
                          {this.state.isLoading && <LinearProgress />}
                        </div>
                      </Row>
                    </Col>
                  </div>
                </Modal.Body>
                <Modal.Footer></Modal.Footer>
              </Form>
            </ValidatorForm>
          </div>
        </Modal>
      </div>
    );
  }
}

export default NuevaIndicacionForm;
