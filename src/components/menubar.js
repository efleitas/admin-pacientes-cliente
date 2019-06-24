import React, {Component} from 'react'
import {
  Container,
  Header,
  Icon,
  Menu,
} from 'semantic-ui-react'

class Menubar extends Component {

  render() {
    return(
        <div>
            <Menu fixed='top'>
            <Container>
                <Menu.Item as='a' href="/">
                <Icon name="medrt" size="huge" color="red" />        
                </Menu.Item>
                <Menu.Menu position='right'>
                <Menu.Item as='a' href="/administracion"><Header as='h3'>Alta paciente</Header></Menu.Item>
                <Menu.Item as='a' href="/pacientes"><Header as='h3'>Buscar paciente</Header></Menu.Item>
                <Menu.Item as='a' href="/obrasociales"><Header as='h3'>Alta obra social</Header></Menu.Item>
                </Menu.Menu>
            </Container>
            </Menu>
        </div>
    )
  }
}

export default Menubar