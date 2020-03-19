import React, { Component } from "react";
import { Button, Modal, Form, Col, Image } from "react-bootstrap";
import putIndicacion from "./putIndicacion";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import RefreshIcon from "@material-ui/icons/Refresh";
import { Button as ButtonMaterial } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import IndicacionImg from './Resource/IndicacionImg.svg';
import LinearProgress from "@material-ui/core/LinearProgress";

class ModificarIndicacionModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.indicacion.id,
      nombre: props.indicacion.nombre,
      descripcion: props.indicacion.descripcion,
      show: false,
      number : 0,
      isLoading: false
    };

    this.handleInputString = this.handleInputString.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handlePutClose = this.handlePutClose.bind(this);
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

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  handleInput(e) {
    this.setState({ [e.target.name]: e.target.value });
     
  }

  handlePutClose() {
    this.setState({isLoading : true})
    putIndicacion(this.state).then(
      resolve => {
        this.setState({isLading: false})
        alert("La indicacion se modifico con exito")
      },
      reject => {
        alert("No se pudo modificar la indicacion")
      }
    )

    this.setState({ show: false });
  }

  handleNumber(){
    this.setState({number : this.state.number + 1})
  }

  render() {

    const isEnabled = this.state.nombre.length > 0;

    return (
      <div>
        <ButtonMaterial
          variant="contained"
          onClick={this.handleShow}
          id={this.props.handleId}
          startIcon={<RefreshIcon />}
        >
          Modificar
        </ButtonMaterial>

        <Modal size="md" show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title><Image width="50" src={IndicacionImg} />Modificar Indicacion</Modal.Title>
          </Modal.Header>
          <div
            className="modificarEmpleadoFormBody"
            onSubmit={this.handlePutClose}
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
                </Modal.Body>
                <Modal.Footer>                  
                  <Button variant="danger" onClick={this.handleClose}>
                    Cancelar
                  </Button>
                  <Button variant="primary" disabled={!isEnabled || this.state.isLoading} type="submit" block>
                    Guardar Cambios
                  </Button>
                  {this.state.isLoading && <LinearProgress />}
                </Modal.Footer>
              </Form>
            </ValidatorForm>
          </div>
        </Modal>
      </div>
    );
  }
}

export default ModificarIndicacionModal;
