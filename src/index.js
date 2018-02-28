//FOREIGN IMPORTS
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';

//LOCAL IMPORTS
import './styles/css/index.css'
import App from './App';
import store from './store';

//Giving app access to the redux store via provider
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);