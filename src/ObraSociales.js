import React, {Component} from 'react'
import { Button, Container, Divider, Form, Grid, Header, Icon, List, Segment } from 'semantic-ui-react'
import Menubar from './components/menubar'

class Pacientes extends Component {
  constructor() {
    super();
    this.state ={
      obras: [],
      id: '',
      nombre: '',
      direccion: '',
      telefono: '',
      email: ''
    }
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
  }

  fetchObraSociales() {
    fetch('http://localhost:5000/api/obrasociales')
      .then(res => res.json())
      .then(data => {
        this.setState({obras: data});
      });
  }

  deleteObra(id) {
    fetch(`http://localhost:5000/api/obrasociales/${id}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          this.fetchObraSociales();
          this.setState({id: '', nombre: '', direccion: '', telefono: '', email: ''})
        });
  }

  editObraSocial() {
    if(this.state.id) {
      fetch(`http://localhost:5000/api/obrasociales/${this.state.id}`, {
      method: 'PUT',
      body: JSON.stringify({
        Nombre : this.state.nombre,
	      Direccion : this.state.direccion,
	      Telefono : this.state.telefono,
        Email : this.state.email,
        Id : this.state.id
      }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
      })
      .then(data => {
        console.log(data);
        this.fetchObraSociales();
        this.setState({id: '', nombre: '', direccion: '', telefono: '', email: ''})
      })
      .catch(err => console.error(err));
    } else {
      fetch('http://localhost:5000/api/obrasociales', {
        method: 'POST',
        body: JSON.stringify({
          Nombre : this.state.nombre,
          Direccion : this.state.direccion,
          Telefono : this.state.telefono,
          Email : this.state.email,
        }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          this.fetchObraSociales();
          this.setState({id: '', nombre: '', direccion: '', telefono: '', email: ''})
        })
    }
    
  }

  render() {   
    return(
      <div>
        <Menubar />

        <Header as="h2" color="red" textAlign="center" style={{ marginTop: '5em' }}>Listado de obras sociales</Header>
        <Segment color="red" style={{ margin: '2em 7em' }}>
          <Header as="h3">Nombre:</Header>
          <List divided verticalAlign='middle'>
            { 
              this.state.obras.map(obra => {
                return (
                  <List.Item key={obra.id}>
                    <List.Content floated='right'>
                      <Button icon onClick={() =>this.setState({id: obra.id, nombre: obra.nombre, direccion: obra.direccion, telefono: obra.telefono, email: obra.email})}>
                      <Icon name="edit" />
                      </Button>
                      <Button  icon color="red" onClick={() =>this.deleteObra(obra.id)}>
                        <Icon name="delete" />
                      </Button>
                    </List.Content>
                    <Icon name="calendar plus" size="big"/>
                    <List.Content>{obra.nombre}</List.Content>
                  </List.Item>
                )
              })
            }
          </List>      
        </Segment>

        <Header as="h2" color="red" textAlign="center">Obra social</Header>
        <Segment color="red" style={{ margin: '2em 7em' }}>
          <Header as="h3">Obra social: información de referencia</Header>
          <Form>
            <Segment.Group>
              <Form.Group style={{ margin: '1em' }}>
                <Form.Input name='nombre'
                label='Nombre' 
                placeholder='Nombre obra social' 
                value={this.state.nombre} 
                onChange={this.handleChange} 
                width={8} />     
              </Form.Group>

              <Form.Group style={{ margin: '1em' }}>
                <Form.Input name='direccion'
                label='Direccion' 
                placeholder='Direccion' 
                value={this.state.direccion} 
                onChange={this.handleChange} 
                width={8} />
                <Form.Input name='telefono'
                label='Telefono' 
                placeholder='Telefono' 
                value={this.state.telefono} 
                onChange={this.handleChange} 
                width={4} />
                <Form.Input name='email'
                label='Correo electronico' 
                placeholder='Correo electronico' 
                onChange={this.handleChange} 
                value={this.state.email} 
                width={4} />
              </Form.Group>

              <Form.Group style={{ margin: '1em' }}>
                  <Button onClick={() => this.editObraSocial()} >Guardar cambios</Button>
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
      </div>
    )
  }
}
export default Pacientes