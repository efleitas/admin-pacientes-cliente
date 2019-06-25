import React from 'react';
import { Route, Switch } from 'react-router-dom';
import App from './App.js';
import Home from './Home.js';
import Administracion from './Administracion.js';
import Pacientes from './Pacientes.js';
import ObraSociales from './ObraSociales.js';
import Page404 from './Page404.js';
import Tutor from './Tutor';

const AppRoutes = () => 
	<App>
		<Switch>
			<Route path="/" exact strict component={Home} />
			<Route path="/administracion" exact strict component={Administracion} />
			<Route path="/pacientes" exact strict component={Pacientes} />
			<Route path="/tutor" exact strict component={Tutor} />
			<Route path="/obrasociales" exact strict component={ObraSociales} />
			<Route component={Page404} />			
		</Switch>
	</App>;

export default AppRoutes;