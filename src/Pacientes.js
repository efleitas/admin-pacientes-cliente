import React, {Component} from 'react'
import {Button, Form, Header, Segment} from 'semantic-ui-react'
import Menubar from './components/menubar'
import Footer from './components/footer'

class Pacientes extends Component {
  constructor() {
    super();
    this.state ={
      pacientes: [],
      obras: [],
      domicilios: [],
      id:"",
      dni: "",
      nombre: "",
      apellido: "",
      fechaNacimiento: "",
      sexo: "",
      nacionalidad: "",
      email: "noposee@hotmail.com",
      fechaAlta: "11/11/1111",
      fechaBaja: "11/11/1111",
      numeroAfiliado: "",
      obraSocialId: "",
      idDomicilio: "",
      calle: "",
      numero: "",
      piso: "",
      dpto: "",
      codigoPostal: "",
      localidad: "",
      provincia: "",
      pais: "",
      personaId: ""
    }
    this.setForm=this.setForm.bind(this);
    this.editPaciente=this.editPaciente.bind(this);
    this.handleChange=this.handleChange.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  componentDidMount() {
    this.fetchObraSociales();
    this.fetchPacientes();
    this.fetchDomicilios();
  }

  fetchObraSociales() {
    fetch('http://localhost:5000/api/obrasociales')
      .then(res => res.json())
      .then(data => {
        this.setState({obras: data});
      });
  }

  fetchPacientes() {
    fetch('http://localhost:5000/api/pacientes')
      .then(res => res.json())
      .then(data => {
        this.setState({pacientes: data});
      });
  }

  fetchDomicilios() {
    fetch('http://localhost:5000/api/domicilios')
      .then(res => res.json())
      .then(data => {
        this.setState({domicilios: data});
      });
  }

  setForm() {
    this.state.pacientes.map(paciente => {
      if(paciente.dni == (document.getElementById('dni').value)) {
        this.setState({
          id: paciente.id,
          dni: paciente.dni,
          nombre: paciente.nombre,
          apellido: paciente.apellido,
          fechaNacimiento: paciente.fechaNacimiento,
          sexo: paciente.Sexo,
          nacionalidad: paciente.nacionalidad,
          email: "noposee@hotmail.com",
          fechaAlta: "11/11/1111",
          fechaBaja: "11/11/1111",
          numeroAfiliado: paciente.numeroAfiliado,
          obraSocialId: paciente.obraSocialId
        })
        this.state.domicilios.map(domicilio => {
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

  editPaciente() {
    fetch(`http://localhost:5000/api/pacientes/${this.state.id}`, {
      method: 'PUT',
      body: JSON.stringify({
        fechaAlta : this.state.fechaAlta,
        fechaBaja : this.state.fechaBaja,
        numeroAfiliado : this.state.numeroAfiliado,
        tutores: "",
        obraSocialId : document.getElementById('obra').options[document.getElementById('obra').selectedIndex].value,
        dni : this.state.dni,
        nombre : this.state.nombre,
        apellido : this.state.apellido,
        fechaNacimiento : this.state.fechaNacimiento,
        Sexo : document.getElementById('sexo').options[document.getElementById('sexo').selectedIndex].text,
        nacionalidad : this.state.nacionalidad,
        email : this.state.email,
        domicilios: "",
        id: this.state.id
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
          dni: "",
          nombre: "",
          apellido: "",
          fechaNacimiento: "",
          sexo: "",
          nacionalidad: "",
          email: "noposee@hotmail.com",
          fechaAlta: "11/11/1111",
          fechaBaja: "11/11/1111",
          numeroAfiliado: "",
          obraSocialId: "",
          idDomicilio: "",
          calle: "",
          numero: "",
          piso: "",
          dpto: "",
          codigoPostal: "",
          localidad: "",
          provincia: "",
          pais: "",
          personaId: ""
        })
        alert('Los datos del paciente fueron modificados satisfactoriamente');
      })
    })
    .catch(err => console.error(err));  
  }
  
  render() {
    return(
      <div>
        <Menubar>
        <Header as="h2" color="red" textAlign="center" style={{ marginTop: '3%' }}>
        Busqueda de paciente
        </Header>
          <Segment color="red" style={{ margin: '1% 5%'}}>
              <Header as="h3">Datos de busqueda</Header>
              <Form>
                <Segment.Group>
                  <Form.Group style={{ margin: '1em' }}>
                    <Form.Input type='number' id='dni' label='Numero de documento' placeholder='Dni del paciente' width={16} />
                  </Form.Group>
                  <Form.Group style={{ margin: '1em' }}>
                    <Button color='red' onClick={this.setForm}>Buscar</Button>
                  </Form.Group>
                </Segment.Group>
              </Form>
        </Segment>

        <Header as="h2" color="red" textAlign="center">Resultados encontrados</Header>

        <Segment color="red" style={{ margin: '1% 5%'}}>
          <Header as="h3">Paciente: datos personales</Header>
          <Form>
            <Segment.Group>
            <Form.Group style={{ margin: '1em' }}>
                <Form.Input name='nombre' label='Nombres' placeholder='Nombres' value={this.state.nombre} onChange={this.handleChange} width={8} />
                <Form.Input name='apellido' label='Apellidos' placeholder='Apellidos' value={this.state.apellido} onChange={this.handleChange} width={8} />     
              </Form.Group>
              <Form.Group style={{ margin: '1em' }}>
                <Form.Input type='number' name='dni' label='Dni' placeholder='Dni' value={this.state.dni} onChange={this.handleChange} width={4} />
                <Form.Input name='nacionalidad' label='Nacionalidad' placeholder='Nacionalidad' value={this.state.nacionalidad} onChange={this.handleChange} width={4} />
                <Form.Input name='fechaNacimiento' type='datetime-local' label='Fecha de Nacimiento' placeholder='Fecha de Nacimiento' value={this.state.fechaNacimiento} onChange={this.handleChange} width={4} />
                <Form.Field id='sexo' label='Sexo' placeholder='Sexo' control='select' width={4} error>
                  <option value='masculino'>masculino</option>
                  <option value='femenino'>femenino</option>
                </Form.Field>
              </Form.Group>
              <Form.Group style={{ margin: '1em' }}>
                <Form.Input type='number' name='numeroAfiliado' label='Numero obra social' placeholder='Numero' value={this.state.numeroAfiliado} onChange={this.handleChange} width={12} />
                <Form.Field id='obra' label='Obra social' placeholder='Obra social' control='select' width={4} error>
                  {
                   this.state.obras.map(obra => {
                    return(<option key={obra.id} value={obra.id}>{obra.nombre}</option>)
                  }) 
                  }
                </Form.Field>
              </Form.Group>
            </Segment.Group>
            
            <Header as="h3">Paciente: datos del domicilio</Header>
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
                <Button color='red' onClick={this.editPaciente}>Guardar cambios</Button>
                <Button color='red'>Cancelar cambios</Button>
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