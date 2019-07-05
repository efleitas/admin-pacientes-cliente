import React, {Component} from 'react'
import {Button, Form, Header, Segment } from 'semantic-ui-react'
import Menubar from './components/menubar'
import Footer from './components/footer'

class Pacientes extends Component {
  constructor() {
    super();
    this.state ={
      pacientes: [],
      listaDomicilios: [],
      tutores: [],
      id:"",
      telefono: "",
      parentezco: "",
      estadoCivil: "",
      Ocupacion: "",
      pacienteId: "",
      dni: "",
      nombre: "",
      apellido: "",
      fechaNacimiento: "",
      Sexo: "",
      nacionalidad: "",
      email: "noposee@hotmail.com",
      domicilios: "",
      calle: "",
      numero: "",
      piso: "",
      dpto: "",
      codigoPostal: "",
      localidad: "",
      provincia: "",
      pais: "Argentina",
      personaId: "",
      idDomicilio: ""
    }
    this.setForm=this.setForm.bind(this);
    this.editTutor=this.editTutor.bind(this);
    this.handleChange=this.handleChange.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  componentDidMount() {
    this.fetchDomicilios();
    this.fetchTutores();
  }

  fetchDomicilios() {
    fetch('http://localhost:5000/api/domicilios')
      .then(res => res.json())
      .then(dom => {
        this.setState({listaDomicilios: dom});
      });
  }

  fetchTutores() {
    fetch('http://localhost:5000/api/tutores')
      .then(res => res.json())
      .then(data => {
        this.setState({tutores: data});
      });
  }

  setForm() {
    this.state.tutores.map(tutor => {
      if(tutor.dni == (document.getElementById('dni').value)) {
        this.setState({
          telefono: tutor.telefono,
          parentezco: tutor.parentezco,
          estadoCivil: tutor.estadoCivil,
          Ocupacion: tutor.Ocupacion,
          pacienteId: tutor.pacienteId,
          dni: tutor.dni,
          nombre: tutor.nombre,
          apellido: tutor.apellido,
          fechaNacimiento: tutor.fechaNacimiento,
          Sexo: tutor.Sexo,
          nacionalidad: tutor.nacionalidad,
          email: tutor.email,
          domicilios: tutor.domicilios,
          id: tutor.id,
        })
        this.state.listaDomicilios.map(domicilio => {
          if (domicilio.personaId == this.state.id) {
            this.setState({
              idDomicilio: domicilio.id,
              calle: domicilio.calle,
              numero: domicilio.numero,
              piso: domicilio.piso,
              dpto: domicilio.dpto,
              codigoPostal: domicilio.codigoPostal,
              localidad: domicilio.localidad,
              provincia: domicilio.provincia,
              pais: domicilio.nacionalidad,
              personaId: domicilio.personaId
            })
          }
        })
      } else {
        console.log('paciente no encontrado')
      }
    }
    )
  }

  editTutor() {
    fetch(`http://localhost:5000/api/tutores/${this.state.id}`, {
      method: 'PUT',
      body: JSON.stringify({
        telefono: this.state.telefono,
        parentezco: document.getElementById('parentezco').options[document.getElementById('parentezco').selectedIndex].value,
        estadoCivil: document.getElementById('estado').options[document.getElementById('estado').selectedIndex].value,
        Ocupacion: document.getElementById('ocupacion').options[document.getElementById('ocupacion').selectedIndex].value,
        pacienteId: this.state.pacienteId,
        dni: this.state.dni,
        nombre: this.state.nombre,
        apellido: this.state.apellido,
        fechaNacimiento: this.state.fechaNacimiento,
        Sexo: document.getElementById('sexo').options[document.getElementById('sexo').selectedIndex].value,alidad: this.state.nacionalidad,
        nacionalidad: this.state.nacionalidad,
        email: this.state.email,
        domicilios: "",
        id: this.state.id,
      }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(data => {
      fetch(`http://localhost:5000/api/domicilios/${this.state.idDomicilio}`, {
        method: 'PUT',
        body: JSON.stringify({
          calle: this.state.calle,
          numero: this.state.numero,
          piso: this.state.piso,
          dpto: this.state.dpto,
          codigoPostal: this.state.codigoPostal,
          localidad: this.state.localidad,
          provincia: this.state.provincia,
          nacionalidad: this.state.pais,
          personaId: this.state.id,
          id: this.state.idDomicilio
        }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      .then(dom => {
        this.setState({
          id:"",
          telefono: "",
          parentezco: "",
          estadoCivil: "",
          Ocupacion: "",
          pacienteId: "",
          dni: "",
          nombre: "",
          apellido: "",
          fechaNacimiento: "",
          Sexo: "",
          nacionalidad: "",
          email: "noposee@hotmail.com",
          domicilios: "",
          calle: "",
          numero: "",
          piso: "",
          dpto: "",
          codigoPostal: "",
          localidad: "",
          provincia: "",
          pais: "Argentina",
          personaId: "",
          idDomicilio: ""
        });
        alert('Los datos del paciente fueron modificados satisfactoriamente');
      })
    })
    .catch(err => console.error(err));  
  }

  render() {
    return(
      <div>
        <Menubar>
        <Header as="h2" color="red" textAlign="center" style={{ marginTop: '3%'}}>
        Busqueda de Tutor
        </Header>
          <Segment color="red" style={{ margin: '1% 5%'}}>
              <Header as="h3">Datos de busqueda</Header>
              <Form>
                <Segment.Group>
                  <Form.Group style={{ margin: '1em' }}>
                    <Form.Input type='number' id='dni' label='Numero de documento' placeholder='Dni del tutor' width={16} />
                  </Form.Group>
                  <Form.Group style={{ margin: '1em' }}>
                    <Button color='red' onClick={this.setForm}>Buscar</Button>
                  </Form.Group>
                </Segment.Group>
              </Form>
        </Segment>

        <Header as="h2" color="red" textAlign="center">Resultados encontrados</Header>

        <Segment color="red" style={{ margin: '1% 5%'}}>
          <Header as="h3">Tutor: datos personales</Header>
          <Form>
            <Segment.Group>
              <Form.Group style={{ margin: '1em' }}>
                <Form.Input name='nombre' label='Nombres' placeholder='Nombres' value={this.state.nombre} onChange={this.handleChange} width={8} />
                <Form.Input name='apellido' label='Apellidos' placeholder='Apellidos' value={this.state.apellido} onChange={this.handleChange} width={8} />     
              </Form.Group>
              <Form.Group style={{ margin: '1em' }}>
                <Form.Input type='number' name='dni' label='Dni' placeholder='Dni' value={this.state.dni} onChange={this.handleChange} width={4} />
                <Form.Input name='nacionalidad' label='Nacionalidad' placeholder='Nacionalidad' value={this.state.nacionalidad} onChange={this.handleChange} width={6} />
                <Form.Input type='datetime-local' name='fechaNacimientoTutor'  label='Fecha de Nacimiento' placeholder='Fecha de Nacimiento' value={this.state.fechaNacimiento} onChange={this.handleChange} width={6} />
              </Form.Group>
              <Form.Group style={{ margin: '1em' }}>
                <Form.Input name='telefono' type='number' label='Tel. Contacto' placeholder='Telefono' value={this.state.telefono} onChange={this.handleChange} width={4} />
                <Form.Input name='email' label='Email' placeholder='Email' value={this.state.email} onChange={this.handleChange} width={8} />
              </Form.Group>
              <Form.Group inline style={{ margin: '3em' }}>
                <Form.Field id='sexo' label='Sexo' placeholder='Sexo' control='select' width={4} error>
                  <option value='Masculino'>masculino</option>
                  <option value='Femenino'>femenino</option>
                </Form.Field>
                <Form.Field id='parentezco' label='Parentezco' placeholder='Parentezco' control='select' width={4} error>
                  <option value='madre'>madre</option>
                  <option value='padre'>padre</option>
                  <option value='hermano'>hermano/a</option>
                  <option value='tio'>tio/a</option>
                  <option value='abuelo'>abuelo/a</option>
                </Form.Field>
                <Form.Field id='estado' label='Estado civil' placeholder='Estado civil' control='select' width={4} error>
                  <option value='Soltero'>soltero/a</option>
                  <option value='Casado'>casado/a</option>
                  <option value='Viudo'>viudo/a</option>
                </Form.Field>
                <Form.Field id='ocupacion' label='Ocupacion' placeholder='Ocupacion' control='select' width={4} error>
                  <option value='desocupado'>desocupado/a</option>
                  <option value='estudiante'>estudiante</option>
                  <option value='privado'>empleado/a s. privado</option>
                  <option value='publico'>empleado/a s. publico</option>
                </Form.Field>
              </Form.Group>
            </Segment.Group>
            
            <Header as="h3">Tutor: datos del domicilio</Header>
            <Segment.Group>
                <Form.Group style={{ margin: '1em' }}>
                  <Form.Input name='calle' label='Calle' placeholder='Calle' value={this.state.calle} onChange={this.handleChange} width={4} />
                  <Form.Input type='number' name='numero' label='Numero' placeholder='Numero' value={this.state.numero} onChange={this.handleChange} width={4} />
                  <Form.Input type='number' name='piso' label='Piso' placeholder='Piso' value={this.state.piso} onChange={this.handleChange} width={4} />
                  <Form.Input type='number' name='dpto' label='Dpto' placeholder='Dpto' value={this.state.dpto} onChange={this.handleChange} width={4} />
                </Form.Group>

                <Form.Group style={{ margin: '1em' }}>
                  <Form.Input name='provincia' label='Provincia' placeholder='Provincia' value={this.state.provincia} onChange={this.handleChange} width={6} />
                  <Form.Input name='localidad' label='Localidad' placeholder='Localidad' value={this.state.localidad} onChange={this.handleChange} width={6} />
                  <Form.Input type='number' name='codigoPostal' label='Codigo postal' placeholder='Codigo postal' value={this.state.codigoPostal} onChange={this.handleChange} width={4} />
                </Form.Group>
            </Segment.Group>

            <Segment.Group>
              <Form.Group style={{ margin: '1em' }}>
                <Button color='red' onClick={this.editTutor}>Guardar</Button>
                <Button color='red'>Cancelar </Button>
              </Form.Group>
            </Segment.Group>
          </Form>
        </Segment>
        
        <Footer /> 
        </Menubar>  
      </div>
    )
  }
}
export default Pacientes