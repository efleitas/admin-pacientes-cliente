import React, {Component} from 'react'
import {Button, Container, Divider, Form, Grid, Header, List, Segment } from 'semantic-ui-react'
import Menubar from './components/menubar'

class Pacientes extends Component {

  render() {
    const obras = [
      { key: 'n', text: 'no tiene', value: 'no tiene' },
      { key: 's', text: 'si tiene', value: 'si tiene' },
    ];

    const sexo = [
      { key: 'm', text: 'masculino', value: 'masculino' },
      { key: 'f', text: 'femenino', value: 'femenino' },
    ];
    
    return(
      <div>
        <Menubar />

        <Segment color="red" style={{ margin: '7em' }}>
              <Header as="h3">Busqueda de Tutor:</Header>
              <Form>
                <Segment.Group>
                  <Form.Group style={{ margin: '1em' }}>
                    <Form.Input label='Numero de documento' placeholder='Dni del tutor' width={8} />
                    <Form.Input label='Id' placeholder='Id del paciente' width={8} />     
                  </Form.Group>

                  <Form.Group style={{ margin: '1em' }}>
                    <Button >Buscar</Button>
                    <Header as="h3"></Header>
                  </Form.Group>

                </Segment.Group>
              </Form>
        </Segment>

        <Header as="h3" textAlign="center">Resultados encontrados</Header>

        <Segment color="red" style={{ margin: '0em 7em' }}>
          <Header as="h3">Tutor: datos personales</Header>
          <Form>
            <Segment.Group>
              <Form.Group style={{ margin: '1em' }}>
                <Form.Input label='Nombres' placeholder='Nombres' width={8} />
                <Form.Input label='Apellidos' placeholder='Apellidos' width={8} />     
              </Form.Group>
              <Form.Group style={{ margin: '1em' }}>
                <Form.Input label='Dni' placeholder='Dni' width={4} />
                <Form.Input label='Nacionalidad' placeholder='Nacionalidad' width={4} />
                <Form.Input label='Fecha de Nacimiento' placeholder='Fecha de Nacimiento' width={4} />
                <Form.Select options={sexo} label='Sexo' placeholder='Sexo' width={4} error/>
              </Form.Group>

              <Form.Group style={{ margin: '1em' }}>
                <Form.Input label='Numero obra social' placeholder='Numero' width={12} />
                <Form.Select options={obras} label='Nombre obra social' placeholder='Obra social' width={4} error />
              </Form.Group>

              <Form.Group style={{ margin: '1em' }}>
                  <Button>Guardar cambios</Button>
              </Form.Group>

            </Segment.Group>
            
            <Header as="h3">Tutor: datos del domicilio</Header>
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