import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import { BrowserRouter as Routes} from 'react-router-dom';
import AppRoutes from './Routes.js'
import './index.css';
import repositoryReducer from './store/reducers/RepositoryReducer';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
 
const store = createStore(repositoryReducer, applyMiddleware(thunk));

ReactDOM.render(<Provider store={store}><Routes><AppRoutes /></Routes></Provider>, document.getElementById('root'));