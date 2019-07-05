import React, {Component} from 'react'
import {
  Grid,
  Header,
  Icon,
  Menu,
} from 'semantic-ui-react'

class Menubar extends Component {

  render() {
    return(
        <div>
          <Menu style={{padding: '0% 2%'}} stackable>
                <Menu.Menu position='left'>
                  <Menu.Item icon as='a' href="/">
                    <Icon name="medrt" size="huge" color="red" />
                  </Menu.Item>
                </Menu.Menu>      
                <Menu.Menu position='right'>
                  <Menu.Item as='a' href="/administracion"><Header as='h3'>Alta de pacientes</Header></Menu.Item>
                  <Menu.Item as='a' href="/listapacientes"><Header as='h3'>Lista de pacientes</Header></Menu.Item>
                  <Menu.Item as='a' href="/pacientes"><Header as='h3'>Busqueda de pacientes</Header></Menu.Item>
                  <Menu.Item as='a' href="/obrasociales"><Header as='h3'>Lista de obra sociales</Header></Menu.Item>
                  <Menu.Item as='a' href="/tutor"><Header as='h3'>Busqueda de tutor</Header></Menu.Item>
                </Menu.Menu>
            </Menu>
            {this.props.children}           
        </div>
    )
  }
}

export default Menubar