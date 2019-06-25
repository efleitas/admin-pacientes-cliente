import React, {Component} from 'react'
import {
  Button,
  Container,
  Divider,
  Form,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Segment,
} from 'semantic-ui-react'
import Menubar from './components/menubar'

class Pacientes extends Component {
  constructor() {
    super();
    this.state ={
      obras: []
    }
    
  }

  componentDidMount() {
    this.fetchTasks();
  }

  fetchTasks() {
    fetch('http://localhost:5000/api/obrasociales')
      .then(res => res.json())
      .then(data => {
        this.setState({obras: data});
        console.log(this.state.obras);
      });
  }

  render() {
    
    return(
      <div>
        <Menubar />

        <Segment color="red" style={{ margin: '7em' }}>
          <Header as="h3">Listado de obras sociales:</Header>
          <List divided verticalAlign='middle'>
            <List.Item>
              <List.Content floated='right'>
                <Button>Editar</Button>
                <Button>Eliminar</Button>
              </List.Content>
              <Icon name="calendar plus" size="big"/>
              <List.Content>Obra social 1</List.Content>
            </List.Item>
            <List.Item>
              <List.Content floated='right'>
                <Button>Editar</Button>
                <Button>Eliminar</Button>
              </List.Content>
              <Icon name="calendar plus" size="big"/>
              <List.Content>Obra social 2</List.Content>
            </List.Item>
            <List.Item>
              <List.Content floated='right'>
                <Button>Editar</Button>
                <Button>Eliminar</Button>
              </List.Content>
              <Icon name="calendar plus" size="big"/>
              <List.Content>Obra social 3</List.Content>
            </List.Item>
            <List.Item>
              <List.Content floated='right'>
                <Button>Editar</Button>
                <Button>Eliminar</Button>
              </List.Content>
              <Icon name="calendar plus" size="big"/>
              <List.Content>Obra social 4</List.Content>
            </List.Item>
          </List>      
        </Segment>

        <Header as="h3" textAlign="center">Editar informacion de la obra social</Header>
        <Segment color="red" style={{ margin: '0em 7em' }}>
          <Header as="h3">Obra social: informacion de referencia</Header>
          <Form>
            <Segment.Group>
              <Form.Group style={{ margin: '1em' }}>
                <Form.Input label='Cuit' placeholder='Cuit obra social' width={8} />
                <Form.Input label='Nombre' placeholder='Nombre obra social' width={8} />     
              </Form.Group>

              <Form.Group style={{ margin: '1em' }}>
                <Form.Input label='Direccion' placeholder='Direccion' width={8} />
                <Form.Input label='Telefono' placeholder='Telefono' width={4} />
                <Form.Input label='Correo electronico' placeholder='Correo electronico' width={4} />
              </Form.Group>

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
      </div>
    )
  }
}
export default Pacientes