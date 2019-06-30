import React, { Component } from 'react'
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'

class LoginForm extends Component {

  redirect() {
    window.location="/administracion"
  }

  render() {
    return (
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='red' textAlign='center'>
            Administracion pacientes
          </Header>
          <Form size='large'>
            <Segment stacked>
              <Form.Input fluid icon='user' iconPosition='left' placeholder='Usuario' />
              <Form.Input
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='Constraseña'
                type='password'
              />

              <Button color='red' fluid size='large' onClick={this.redirect}>
                Ingresar
              </Button>
            </Segment>
          </Form>
          <Message>
            Olvidaste tu contraseña? <a href='#'><Header as="h4" color="blue">Recuperar contraseña</Header></a>
          </Message>
        </Grid.Column>
      </Grid>
    )
  }
}

export default LoginForm