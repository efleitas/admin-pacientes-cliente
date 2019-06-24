import React from 'react';
import { Route, Switch } from 'react-router-dom';
import App from './App.js';
import Home from './Home.js';
import Administracion from './Administracion.js';
import Pacientes from './Pacientes.js';
import ObraSociales from './ObraSociales.js';
import Page404 from './Page404.js';

const AppRoutes = () => 
	<App>
		<Switch>
			<Route path="/" exact strict component={Home} />
			<Route path="/administracion" exact strict component={Administracion} />
			<Route path="/pacientes" exact strict component={Pacientes} />
			<Route path="/obrasociales" exact strict component={ObraSociales} />
			<Route component={Page404} />			
		</Switch>
	</App>;

export default AppRoutes;