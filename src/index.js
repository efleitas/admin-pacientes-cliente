import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import { BrowserRouter as Routes} from 'react-router-dom';
import AppRoutes from './Routes.js'
import './index.css';


ReactDOM.render(<Routes><AppRoutes /></Routes>, document.getElementById('root'));