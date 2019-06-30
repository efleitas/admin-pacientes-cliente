import React, {Component} from 'react'
import {Container, Divider, Form, Grid, Header, List, Segment} from 'semantic-ui-react'
import Menubar from './components/menubar'

class FixedMenuLayout extends Component {
  constructor() {
    super();
    this.state ={
      obras: [],
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
      obraSocialId: ""
    }
    this.handleChange=this.handleChange.bind(this);
    this.postPacientes=this.postPacientes.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  componentDidMount() {
    this.fetchObraSociales();
  }
  
  fetchObraSociales() {
    fetch('http://localhost:5000/api/obrasociales')
      .then(res => res.json())
      .then(data => {
        this.setState({obras: data});
      });
  }

  postPacientes() {
    fetch('http://localhost:5000/api/pacientes', {
        method: 'POST',
        body: JSON.stringify({
          Dni : this.state.dni,
          Nombre : this.state.nombre,
          Apellido : this.state.apellido,
          FechaNacimiento : this.state.fechaNacimiento,
          Sexo : document.getElementById('sexo').options[document.getElementById('sexo').selectedIndex].text,
          Nacionalidad : this.state.nacionalidad,
          Email : this.state.email,
          FechaAlta : this.state.fechaAlta,
          FechaBaja : this.state.fechaBaja,
          NumeroAfiliado : this.state.numeroAfiliado,
          ObraSocialId : document.getElementById('obra').options[document.getElementById('obra').selectedIndex].value,
        }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          this.setState({dni: "",
          nombre: "",
          apellido: "",
          fechaNacimiento: "",
          sexo: "",
          nacionalidad: "",
          numeroAfiliado: "",
          obraSocialId: ""})
        })
  }
  
  render() {
    return(
      <div>
        <Menubar />

        <Header as="h2" color="red" textAlign="center" style={{ marginTop: '5em' }}>
          Formulario de alta de paciente
        </Header>
        <Segment color="red" style={{ margin: '2em 7em' }}>
          <Header as="h3">Datos personales</Header>
          <Form>
            <Segment.Group>
              <Form.Group style={{ margin: '1em' }}>
                <Form.Input name='nombre' label='Nombres' placeholder='Nombres' value={this.state.nombre} onChange={this.handleChange} width={8} />
                <Form.Input name='apellido' label='Apellidos' placeholder='Apellidos' value={this.state.apellido} onChange={this.handleChange} width={8} />     
              </Form.Group>
              <Form.Group style={{ margin: '1em' }}>
                <Form.Input name='dni' label='Dni' placeholder='Dni' value={this.state.dni} onChange={this.handleChange} width={4} />
                <Form.Input name='nacionalidad' label='Nacionalidad' placeholder='Nacionalidad' value={this.state.nacionalidad} onChange={this.handleChange} width={4} />
                <Form.Input name='fechaNacimiento' type="date" label='Fecha de Nacimiento' placeholder='Fecha de Nacimiento' value={this.state.fechaNacimiento} onChange={this.handleChange} width={4} />
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
            
            <Header as="h3">Datos del domicilio</Header>
            <Segment.Group>
                <Form.Group style={{ margin: '1em' }}>
                  <Form.Input label='Direccion' placeholder='Direccon' width={16} />
                </Form.Group>
                <Form.Group style={{ margin: '1em' }}>
                  <Form.Input label='Calle' placeholder='Calle' width={4} />
                  <Form.Input label='Numero' placeholder='Numero' width={4} />
                  <Form.Input label='Piso' placeholder='Piso' width={4} />
                  <Form.Input label='Dpto' placeholder='Dpto' width={4} />
                </Form.Group>

                <Form.Group style={{ margin: '1em' }}>
                  <Form.Input label='Provincia' placeholder='Provincia' width={6} />
                  <Form.Input label='Localidad' placeholder='Localidad' width={6} />
                  <Form.Input label='Codigo postal' placeholder='Codigo postal' width={4} />
                </Form.Group>
            </Segment.Group>
            
            <Header as="h3">Datos del Familiar 1</Header>
            <Segment.Group>
              <Form.Group style={{ margin: '1em' }}>
                <Form.Input label='Nombres' placeholder='Nombres' width={8} />
                <Form.Input label='Apellidos' placeholder='Apellidos' width={8} />     
              </Form.Group>
              <Form.Group style={{ margin: '1em' }}>
                <Form.Input label='Dni' placeholder='Dni' width={4} />
                <Form.Input label='Nacionalidad' placeholder='Nacionalidad' width={6} />
                <Form.Input label='Fecha de Nacimiento' placeholder='Fecha de Nacimiento' width={6} />
              </Form.Group>
              <Form.Group style={{ margin: '1em' }}>
                <Form.Input label='Tel. Contacto' placeholder='Telefono' width={4} />
                <Form.Input label='Email' placeholder='Email' width={8} />
              </Form.Group>
              <Form.Group inline style={{ margin: '3em' }}>
                <Form.Field id='sexo' label='Sexo' placeholder='Sexo' control='select' width={4} error>
                  <option value='masculino'>masculino</option>
                  <option value='femenino'>femenino</option>
                </Form.Field>
                <Form.Field id='parentesco' label='Parentesco' placeholder='Parentesco' control='select' width={4} error>
                  <option value='madre'>madre</option>
                  <option value='padre'>padre</option>
                  <option value='hermano'>hermano/a</option>
                  <option value='tio'>tio/a</option>
                  <option value='abuelo'>abuelo/a</option>
                </Form.Field>
                <Form.Field id='estado' label='Estado civil' placeholder='Estado civil' control='select' width={4} error>
                  <option value='soltero'>soltero/a</option>
                  <option value='casado'>casado/a</option>
                  <option value='viudo'>viudo/a</option>
                  <option value='divorciado'>divorciado/a</option>
                </Form.Field>
                <Form.Field id='ocupacion' label='Ocupacion' placeholder='Ocupacion' control='select' width={4} error>
                  <option value='desocupado'>desocupado/a</option>
                  <option value='estudiante'>estudiante</option>
                  <option value='privado'>empleado/a s. privado</option>
                  <option value='publico'>empleado/a s. publico</option>
                  <option value='amacasa'>ama/o de casa</option>
                </Form.Field>
              </Form.Group>
              <Segment>
              <Header as="h4">Domiclio</Header>
                <Form.Group style={{ margin: '1em' }}>
                  <Form.Input label='Direccion' placeholder='Direccon' width={16} />
                </Form.Group>
                <Form.Group style={{ margin: '1em' }}>
                  <Form.Input label='Calle' placeholder='Calle' width={4} />
                  <Form.Input label='Numero' placeholder='Numero' width={4} />
                  <Form.Input label='Piso' placeholder='Piso' width={4} />
                  <Form.Input label='Dpto' placeholder='Dpto' width={4} />
                </Form.Group>

                <Form.Group style={{ margin: '1em' }}>
                  <Form.Input label='Provincia' placeholder='Provincia' width={6} />
                  <Form.Input label='Localidad' placeholder='Localidad' width={6} />
                  <Form.Input label='Codigo postal' placeholder='Codigo postal' width={4} />
                </Form.Group>
              </Segment>
            </Segment.Group>

            <Header as="h3">Datos del Familiar 2</Header>
            <Segment.Group>
              <Form.Group style={{ margin: '1em' }}>
                <Form.Input label='Nombres' placeholder='Nombres' width={8} />
                <Form.Input label='Apellidos' placeholder='Apellidos' width={8} />     
              </Form.Group>
              <Form.Group style={{ margin: '1em' }}>
                <Form.Input label='Dni' placeholder='Dni' width={4} />
                <Form.Input label='Nacionalidad' placeholder='Nacionalidad' width={6} />
                <Form.Input label='Fecha de Nacimiento' placeholder='Fecha de Nacimiento' width={6} />
              </Form.Group>
              <Form.Group style={{ margin: '1em' }}>
                <Form.Input label='Tel. Contacto' placeholder='Telefono' width={4} />
                <Form.Input label='Email' placeholder='Email' width={8} />
              </Form.Group>
              <Form.Group inline style={{ margin: '3em' }}>
              <Form.Field id='sexo' label='Sexo' placeholder='Sexo' control='select' width={4} error>
                  <option value='masculino'>masculino</option>
                  <option value='femenino'>femenino</option>
                </Form.Field>
                <Form.Field id='parentesco' label='Parentesco' placeholder='Parentesco' control='select' width={4} error>
                  <option value='madre'>madre</option>
                  <option value='padre'>padre</option>
                  <option value='hermano'>hermano/a</option>
                  <option value='tio'>tio/a</option>
                  <option value='abuelo'>abuelo/a</option>
                </Form.Field>
                <Form.Field id='estado' label='Estado civil' placeholder='Estado civil' control='select' width={4} error>
                  <option value='soltero'>soltero/a</option>
                  <option value='casado'>casado/a</option>
                  <option value='viudo'>viudo/a</option>
                  <option value='divorciado'>divorciado/a</option>
                </Form.Field>
                <Form.Field id='ocupacion' label='Ocupacion' placeholder='Ocupacion' control='select' width={4} error>
                  <option value='desocupado'>desocupado/a</option>
                  <option value='estudiante'>estudiante</option>
                  <option value='privado'>empleado/a s. privado</option>
                  <option value='publico'>empleado/a s. publico</option>
                  <option value='amacasa'>ama/o de casa</option>
                </Form.Field>
              </Form.Group>
              <Segment>
              <Header as="h4">Domiclio</Header>
                <Form.Group style={{ margin: '1em' }}>
                  <Form.Input label='Direccion' placeholder='Direccon' width={16} />
                </Form.Group>
                <Form.Group style={{ margin: '1em' }}>
                  <Form.Input label='Calle' placeholder='Calle' width={4} />
                  <Form.Input label='Numero' placeholder='Numero' width={4} />
                  <Form.Input label='Piso' placeholder='Piso' width={4} />
                  <Form.Input label='Dpto' placeholder='Dpto' width={4} />
                </Form.Group>

                <Form.Group style={{ margin: '1em' }}>
                  <Form.Input label='Provincia' placeholder='Provincia' width={6} />
                  <Form.Input label='Localidad' placeholder='Localidad' width={6} />
                  <Form.Input label='Codigo postal' placeholder='Codigo postal' width={4} />
                </Form.Group>
              </Segment>
            </Segment.Group>

            <Form.Group>
              <Form.Button onClick={this.postPacientes}>Guardar</Form.Button>
              <Form.Button>Cancelar</Form.Button>
            </Form.Group>

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
      </div>
    )
  }
}

export default FixedMenuLayout