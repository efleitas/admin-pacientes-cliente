import React, {Component} from 'react'
import { Button, Form, Header, Icon, List, Segment } from 'semantic-ui-react'
import Menubar from './components/menubar'
import Footer from './components/footer'

class Pacientes extends Component {
  constructor() {
    super();
    this.state ={
      pacientes: [],
      tutores: [],
      id: '',
      nombre: '',
      apellido: '',
      dni: '',
      numeroAfiliado: ''
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
    this.fetchPacientes();
    this.fetchTutores();
  }

  fetchTutores() {
    fetch('http://localhost:5000/api/tutores')
      .then(res => res.json())
      .then(data => {
        this.setState({tutores: data});
      });
  }

  fetchPacientes() {
    fetch('http://localhost:5000/api/pacientes')
      .then(res => res.json())
      .then(data => {
        this.setState({pacientes: data});
      });
  }

  deletePaciente(ident) {
    this.state.tutores.map(tutor => {
      if(tutor.pacienteId == ident) {
        fetch(`http://localhost:5000/api/tutores/${tutor.id}`, {
          method: 'DELETE',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          fetch(`http://localhost:5000/api/pacientes/${ident}`, {
            method: 'DELETE',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          })
          .then(res => res.json())
          .then(data => {
            console.log(data);
            this.fetchPacientes();
            this.fetchTutores();
            this.setState({id: '', nombre: '', apellido: '', dni: '', numeroAfiliado: ''});
            alert("Paciente y tutor eliminado");
          })
        })
        .catch(err => {console.log(err)})
      }
    })
  }

  render() {   
    return(
      <div>
        <Menubar />

        <Header as="h2" color="red" textAlign="center" style={{ marginTop: '3%' }}>Listado de Pacientes</Header>
        <Segment color="red" style={{ margin: '1% 5%'}}>
          <Header as="h3">Nombre:</Header>
          <List divided verticalAlign='middle'>
            { 
              this.state.pacientes.map(paciente => {
                return (
                  <List.Item key={paciente.id}>
                    <List.Content floated='right'>
                      <Button  icon color="red" onClick={() =>this.deletePaciente(paciente.id)}>
                        <Icon name="delete" />
                      </Button>
                    </List.Content>
                    <Icon name="calendar plus" size="big"/>
                    <List.Content><Header as='h3'>Dni: {paciente.dni}</Header><Header as='h3'>Nombre:{paciente.apellido} {paciente.nombre}</Header><Header as='h3'>Numero obra social: {paciente.numeroAfiliado}</Header></List.Content>
                  </List.Item>
                )
              })
            }
          </List>      
        </Segment>

        <Footer />
      </div>
    )
  }
}
export default Pacientes