import React, {Component} from 'react'
import { Button, Form, Header, Icon, List, Segment } from 'semantic-ui-react'
import Menubar from './components/menubar'
import Footer from './components/footer'

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
        })
        .catch(err => {console.log(err)})
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
        this.fetchObraSociales();
        this.setState({id: '', nombre: '', direccion: '', telefono: '', email: ''});
        alert('Los datos de la obra social fueron modificados correctamente');
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
          alert('La obra social fue dada de alta exitosamente')
        })
        .catch(err => {
          alert('Debe ingresar todos los datos solicitados en el formulario')
        });
    }
    
  }

  render() {   
    return(
      <div>
        <Menubar />

        <Header as="h2" color="red" textAlign="center" style={{ marginTop: '3%' }}>Listado de obras sociales</Header>
        <Segment color="red" style={{ margin: '1% 5%'}}>
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

        <Header as="h2" color="red" textAlign="center">Obra social: Alta / Modificacion</Header>
        <Segment color="red" style={{ margin: '1% 5%'}}>
          <Header as="h3">Obra social: información de referencia</Header>
          <Form style={{backgroundColor: '#fff'}}>
            <Segment.Group>
              <Form.Group style={{ margin: '1em' }}>
                <Form.Input name='nombre'
                label='Nombre' 
                placeholder='Nombre obra social' 
                value={this.state.nombre} 
                onChange={this.handleChange} 
                width={8}/>     
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
                type="number"
                value={this.state.telefono} 
                onChange={this.handleChange} 
                width={4}/>
                <Form.Input type='email'
                name='email'
                label='Correo electronico' 
                placeholder='Correo electronico' 
                onChange={this.handleChange} 
                value={this.state.email} 
                width={4} />
              </Form.Group>

              <Form.Group style={{ margin: '1em' }}>
                  <Button color='red' onClick={() => this.editObraSocial()} >Guardar cambios</Button>
                  <Button color='red'>Cancelar cambios</Button>
              </Form.Group>
            </Segment.Group>
          </Form>
        </Segment>

        <Footer />
      </div>
    )
  }
}
export default Pacientes