import React, {Component} from 'react'
import { Form, Header, Segment} from 'semantic-ui-react'
import Menubar from './components/menubar'
import Footer from './components/footer'

class Administracion extends Component {
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
      obraSocialId: "",
      calle: "",
      numero: "",
      piso: "",
      dpto: "",
      codigoPostal: "",
      localidad: "",
      provincia: "",
      nacionalidad: "",
      personaId: "",
      telefonoTutor: "",
      dniTutor: "",
      nombreTutor: "",
      apellidoTutor: "",
      fechaNacimientoTutor: "",
      SexoTutor: "",
      nacionalidadTutor: "",
      emailTutor: "",
      domiciliosTutor: "",
      calleTutor: "",
      numeroTutor: "",
      pisoTutor: "",
      dptoTutor: "",
      codigoPostalTutor: "",
      localidadTutor: "",
      provinciaTutor: "",
      paisTutor: ""
    }
    this.handleChange=this.handleChange.bind(this);
    this.postPacientes=this.postPacientes.bind(this);
    this.postDomicilio=this.postDomicilio.bind(this);
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
          console.log('paciente dado de alta: '+data.id);
          fetch('http://localhost:5000/api/domicilios', {
            method: 'POST',
            body: JSON.stringify({
              calle: this.state.calle,
              numero: this.state.numero,
              piso: this.state.piso,
              dpto: this.state.dpto,
              codigoPostal: this.state.codigoPostal,
              localidad: this.state.localidad,
              provincia: this.state.provincia,
              nacionalidad: this.state.nacionalidad,
              personaId: data.id
            }),
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          })
            .then(res => res.json())
            .then(datos => {
              console.log("Domicilio dado de alta: "+datos.id);
              this.setState({
                calle: "",
                numero: "",
                piso: "",
                dpto: "",
                codigoPostal: "",
                localidad: "",
                provincia: "",
                nacionalidad: "",
              });
            });
            fetch('http://localhost:5000/api/tutores', {
              method: 'POST',
              body: JSON.stringify({
                telefono: this.state.telefonoTutor,
                parentezco: document.getElementById('parentezco').options[document.getElementById('parentezco').selectedIndex].value,
                estadoCivil: document.getElementById('estadoTutor').options[document.getElementById('estadoTutor').selectedIndex].value,
                Ocupacion: document.getElementById('ocupacionTutor').options[document.getElementById('ocupacionTutor').selectedIndex].value,
                pacienteId: data.id,
                dni: this.state.dniTutor,
                nombre: this.state.nombreTutor,
                apellido: this.state.apellidoTutor,
                fechaNacimiento: this.state.fechaNacimientoTutor,
                Sexo:  document.getElementById('sexo').options[document.getElementById('sexo').selectedIndex].text,
                nacionalidad: this.state.nacionalidadTutor,
                email: this.state.emailTutor,
                domicilios: ""
              }),
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              }
            })
              .then(res => res.json())
              .then(tut => {
                console.log("Tutor dado de alta: "+tut.id);
                fetch('http://localhost:5000/api/domicilios', {
                  method: 'POST',
                  body: JSON.stringify({
                    calle: this.state.calleTutor,
                    numero: this.state.numeroTutor,
                    piso: this.state.pisoTutor,
                    dpto: this.state.dptoTutor,
                    codigoPostal: this.state.codigoPostalTutor,
                    localidad: this.state.localidadTutor,
                    provincia: this.state.provinciaTutor,
                    nacionalidad: "Argentina",
                    personaId: tut.id,
                  }),
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  }
                })
                  .then(res => res.json())
                  .then(domtut => {
                    alert('Paciente dado de alta dado exitosamente');
                    console.log("Domicilio dado de alta: "+domtut.id);
                  });
              })
        });
  }

  postDomicilio() {
    fetch('http://localhost:5000/api/domicilios', {
      method: 'POST',
      body: JSON.stringify({
        calle: "3 de abril",
        numero: "12",
        piso: "1",
        dpto: "1",
        codigoPostal: "3400",
        localidad: "corrientes",
        provincia: "corrientes",
        nacionalidad: "corrientes",
        personaId: "49",
      }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(datos => {
        alert('Domicilio dado de alta');
        console.log("Domicilio dado de alta: "+datos.id);
      });
  }
  
  render() {
    return(
      <div>
        <Menubar />

        <Header as="h2" color="red" textAlign="center" style={{ marginTop: '3%' }}>
          Formulario de alta de paciente
        </Header>
        <Segment color="red" style={{ margin: '1% 5%'}}>
          <Header as="h3">Datos personales</Header>
          <Form>
            <Segment.Group>
              <Form.Group style={{ margin: '1em' }}>
                <Form.Input name='nombre' label='Nombres' placeholder='Nombres' value={this.state.nombre} onChange={this.handleChange} width={8} />
                <Form.Input name='apellido' label='Apellidos' placeholder='Apellidos' value={this.state.apellido} onChange={this.handleChange} width={8} />     
              </Form.Group>
              <Form.Group style={{ margin: '1em' }}>
                <Form.Input type='number' name='dni' label='Dni' placeholder='Dni' value={this.state.dni} onChange={this.handleChange} width={4} />
                <Form.Input name='nacionalidad' label='Nacionalidad' placeholder='Nacionalidad' value={this.state.nacionalidad} onChange={this.handleChange} width={4} />
                <Form.Input name='fechaNacimiento' type="date" label='Fecha de Nacimiento' placeholder='Fecha de Nacimiento' value={this.state.fechaNacimiento} onChange={this.handleChange} width={4} />
                <Form.Field id='sexo' label='Sexo' placeholder='Sexo' control='select' width={4} error>
                  <option value='masculino'>masculino</option>
                  <option value='femenino'>femenino</option>
                </Form.Field>
              </Form.Group>
              <Form.Group style={{ margin: '1em' }}>
                <Form.Input type='number' name='numeroAfiliado' label='Numero obra social' placeholder='Numero' value={this.state.numeroAfiliado} onChange={this.handleChange} width={12} />
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
                  <Form.Input name='calle' label='Calle' placeholder='Calle' value={this.state.calle} onChange={this.handleChange} width={4} />
                  <Form.Input type='number' name='numero' label='Numero' placeholder='Numero' value={this.state.numero} onChange={this.handleChange} width={4} />
                  <Form.Input type='number' name='piso' label='Piso' placeholder='Piso' value={this.state.piso} onChange={this.handleChange} width={4} />
                  <Form.Input type='number' name='dpto' label='Dpto' placeholder='Dpto' value={this.state.dpto} onChange={this.handleChange} width={4} />
                </Form.Group>

                <Form.Group style={{ margin: '1em' }}>
                  <Form.Input name='provincia' label='Provincia' placeholder='Provincia' value={this.state.provincia} onChange={this.handleChange} width={6} />
                  <Form.Input name='localidad' label='Localidad' placeholder='Localidad' value={this.state.localidad} onChange={this.handleChange} width={6} />
                  <Form.Input type='number' name='codigoPostal'label='Codigo postal' placeholder='Codigo postal' value={this.state.codigoPostal} onChange={this.handleChange} width={4} />
                </Form.Group>
            </Segment.Group>
            
            <Header as="h3">Datos del Familiar</Header>
            <Segment.Group>
              <Form.Group style={{ margin: '1em' }}>
                <Form.Input name='nombreTutor' label='Nombres' placeholder='Nombres' value={this.state.nombreTutor} onChange={this.handleChange} width={8} />
                <Form.Input name='apellidoTutor' label='Apellidos' placeholder='Apellidos' value={this.state.apellidoTutor} onChange={this.handleChange} width={8} />     
              </Form.Group>
              <Form.Group style={{ margin: '1em' }}>
                <Form.Input type='number' name='dniTutor' label='Dni' placeholder='Dni' value={this.state.dniTutor} onChange={this.handleChange} width={4} />
                <Form.Input name='nacionalidadTutor' label='Nacionalidad' placeholder='Nacionalidad' value={this.state.nacionalidadTutor} onChange={this.handleChange} width={6} />
                <Form.Input type='date' name='fechaNacimientoTutor'  label='Fecha de Nacimiento' placeholder='Fecha de Nacimiento' value={this.state.fechaNacimientoTutor} onChange={this.handleChange} width={6} />
              </Form.Group>
              <Form.Group style={{ margin: '1em' }}>
                <Form.Input type='number' name='telefonoTutor' type='number' label='Tel. Contacto' placeholder='Telefono' value={this.state.telefonoTutor} onChange={this.handleChange} width={4} />
                <Form.Input name='emailTutor' label='Email' placeholder='Email' value={this.state.emailTutor} onChange={this.handleChange} width={8} />
              </Form.Group>
              <Form.Group inline style={{ margin: '3em' }}>
                <Form.Field id='sexoTutor' label='Sexo' placeholder='Sexo' control='select' width={4} error>
                  <option value='Masculino'>masculino</option>
                  <option value='Femenino'>femenino</option>
                </Form.Field>
                <Form.Field id='parentezco' label='Parentezco' placeholder='Parentezco' control='select' width={4} error>
                  <option value='madre'>madre</option>
                  <option value='padre'>padre</option>
                  <option value='hermano'>hermano/a</option>
                  <option value='tio'>tio/a</option>
                  <option value='abuelo'>abuelo/a</option>
                </Form.Field>
                <Form.Field id='estadoTutor' label='Estado civil' placeholder='Estado civil' control='select' width={4} error>
                  <option value='Soltero'>soltero/a</option>
                  <option value='Casado'>casado/a</option>
                  <option value='Viudo'>viudo/a</option>
                </Form.Field>
                <Form.Field id='ocupacionTutor' label='Ocupacion' placeholder='Ocupacion' control='select' width={4} error>
                  <option value='desocupado'>desocupado/a</option>
                  <option value='estudiante'>estudiante</option>
                  <option value='privado'>empleado/a s. privado</option>
                  <option value='publico'>empleado/a s. publico</option>
                </Form.Field>
              </Form.Group>
              <Segment>
              <Header as="h4">Domiclio</Header>
                <Form.Group style={{ margin: '1em' }}>
                  <Form.Input name='domiciliosTutor' label='Direccion' placeholder='Direccon' value={this.state.domiciliosTutor}  onChange={this.handleChange} width={16} />
                </Form.Group>
                <Form.Group style={{ margin: '1em' }}>
                  <Form.Input name='calleTutor' label='Calle' placeholder='Calle' value={this.state.calleTutor}  onChange={this.handleChange} width={4} />
                  <Form.Input type='number' name='numeroTutor' label='Numero' placeholder='Numero' value={this.state.numeroTutor}  onChange={this.handleChange} width={4} />
                  <Form.Input type='number' name='pisoTutor' label='Piso' placeholder='Piso' value={this.state.pisoTutor}  onChange={this.handleChange} width={4} />
                  <Form.Input type='number' name='dptoTutor' label='Dpto' placeholder='Dpto' value={this.state.dptoTutor}  onChange={this.handleChange} width={4} />
                </Form.Group>

                <Form.Group style={{ margin: '1em' }}>
                  <Form.Input name='provinciaTutor' label='Provincia' placeholder='Provincia' value={this.state.provinciaTutor}  onChange={this.handleChange} width={6} />
                  <Form.Input name='localidadTutor' label='Localidad' placeholder='Localidad' value={this.state.localidadTutor}  onChange={this.handleChange} width={6} />
                  <Form.Input type='number' name='codigoPostalTutor' label='Codigo postal' placeholder='Codigo postal' value={this.state.codigoPostalTutor}  onChange={this.handleChange} width={4} />
                </Form.Group>
              </Segment>
            </Segment.Group>

            <Form.Group>
              <Form.Button color='red' onClick={this.postPacientes}>Guardar</Form.Button>
              <Form.Button color='red'>Cancelar</Form.Button>
            </Form.Group>

          </Form>
        </Segment>
        
        <Footer/>
      </div>
    )
  }
}

export default Administracion