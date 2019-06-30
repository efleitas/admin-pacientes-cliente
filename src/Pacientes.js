import React, {Component} from 'react'
import {Button, Container, Divider, Form, Grid, Header, List, Segment} from 'semantic-ui-react'
import Menubar from './components/menubar'

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
    this.setDom=this.setDom.bind(this);
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
        this.setDom();
      } else {
        console.log('paciente no encontrado')
      }
    }
    )
  }

  setDom() {
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
      } else {
        console.log('no encontrado asdasd'+ this.state.dni)
      }
    })
  }

  
  render() {
    return(
      <div>
        <Menubar>
          <Segment color="red" style={{ margin: '7em' }}>
              <Header as="h3">Busqueda de paciente:</Header>
              <Form>
                <Segment.Group>
                  <Form.Group style={{ margin: '1em' }}>
                    <Form.Input id='dni' label='Numero de documento' placeholder='Dni del paciente' width={8} />
                    <Form.Input id='identificacion' label='Id' placeholder='Id del paciente' width={8} />     
                  </Form.Group>
                  <Form.Group style={{ margin: '1em' }}>
                    <Button onClick={this.setForm}>Buscar</Button>
                  </Form.Group>
                </Segment.Group>
              </Form>
        </Segment>

        <Header as="h3" textAlign="center">Resultados encontrados</Header>

        <Segment color="red" style={{ margin: '0em 7em' }}>
          <Header as="h3">Paciente: datos personales</Header>
          <Form>
            <Segment.Group>
            <Form.Group style={{ margin: '1em' }}>
                <Form.Input name='nombre' label='Nombres' placeholder='Nombres' value={this.state.nombre} onChange={this.handleChange} width={8} />
                <Form.Input name='apellido' label='Apellidos' placeholder='Apellidos' value={this.state.apellido} onChange={this.handleChange} width={8} />     
              </Form.Group>
              <Form.Group style={{ margin: '1em' }}>
                <Form.Input name='dni' label='Dni' placeholder='Dni' value={this.state.dni} onChange={this.handleChange} width={4} />
                <Form.Input name='nacionalidad' label='Nacionalidad' placeholder='Nacionalidad' value={this.state.nacionalidad} onChange={this.handleChange} width={4} />
                <Form.Input name='fechaNacimiento' type='datetime-local' label='Fecha de Nacimiento' placeholder='Fecha de Nacimiento' value={this.state.fechaNacimiento} onChange={this.handleChange} width={4} />
                <Form.Field id='sexo' label='Sexo' placeholder='Sexo' control='select' width={4} error>
                  <option value='masculino'>masculino</option>
                  <option value='femenino'>femenino</option>
                </Form.Field>
              </Form.Group>
              <Form.Group style={{ margin: '1em' }}>
                <Form.Input name='numeroAfiliado' label='Numero obra social' placeholder='Numero' value={this.state.numeroAfiliado} onChange={this.handleChange} width={12} />
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
                  <Form.Input label='Calle' placeholder='Calle' value={this.state.calle} width={4} />
                  <Form.Input label='Numero' placeholder='Numero' value={this.state.numero} width={4} />
                  <Form.Input label='Piso' placeholder='Piso' value={this.state.piso} width={4} />
                  <Form.Input label='Dpto' placeholder='Dpto' value={this.state.dpto} width={4} />
                </Form.Group>

                <Form.Group style={{ margin: '1em' }}>
                  <Form.Input label='Provincia' placeholder='Provincia' value={this.state.provincia} width={6} />
                  <Form.Input label='Localidad' placeholder='Localidad' value={this.state.localidad} width={6} />
                  <Form.Input label='Codigo postal' placeholder='Codigo postal' value={this.state.codigoPostal} width={4} />
                </Form.Group>
            </Segment.Group>

            <Segment.Group>
              <Form.Group style={{ margin: '1em' }}>
                <Button>Guardar cambios</Button>
              </Form.Group>
            </Segment.Group>
          </Form>
        </Segment>

          <Segment inverted vertical style={{ margin: '5em 0em 0em', padding: '5em 0em' }}>
            <Container textAlign='center'>
              <Grid divided inverted stackable>
                <Grid.Column width={3}>
                  <Header inverted as='h4' content='Group 1' />
                  <List link inverted>
                    <List.Item as='a'>Link One</List.Item>
                    <List.Item as='a'>Link Two</List.Item>
                    <List.Item as='a'>Link Three</List.Item>
                    <List.Item as='a'>Link Four</List.Item>
                  </List>
                </Grid.Column>
                <Grid.Column width={3}>
                  <Header inverted as='h4' content='Group 2' />
                  <List link inverted>
                    <List.Item as='a'>Link One</List.Item>
                    <List.Item as='a'>Link Two</List.Item>
                    <List.Item as='a'>Link Three</List.Item>
                    <List.Item as='a'>Link Four</List.Item>
                  </List>
                </Grid.Column>
                <Grid.Column width={3}>
                  <Header inverted as='h4' content='Group 3' />
                  <List link inverted>
                    <List.Item as='a'>Link One</List.Item>
                    <List.Item as='a'>Link Two</List.Item>
                    <List.Item as='a'>Link Three</List.Item>
                    <List.Item as='a'>Link Four</List.Item>
                  </List>
                </Grid.Column>
                <Grid.Column width={7}>
                  <Header inverted as='h4' content='Footer Header' />
                  <p>
                    Extra space for a call to action inside the footer that could help re-engage users.
                  </p>
                </Grid.Column>
              </Grid>

              <Divider inverted section />
              <List horizontal inverted divided link size='small'>
                <List.Item as='a' href='#'>
                  Site Map
                </List.Item>
                <List.Item as='a' href='#'>
                  Contact Us
                </List.Item>
                <List.Item as='a' href='#'>
                  Terms and Conditions
                </List.Item>
                <List.Item as='a' href='#'>
                  Privacy Policy
                </List.Item>
              </List>
            </Container>
          </Segment>
        </Menubar>
      </div>
    )
  }
}
export default Pacientes