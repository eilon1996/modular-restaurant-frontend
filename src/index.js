import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import 'font-awesome/css/font-awesome.css';
import 'bootstrap-social/bootstrap-social.css';
import App from './App';
//in the course code the origin file name is registerServiceWorker
import registerServiceWorker from './serviceWorker';

import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

const options = {
  // you can also just use 'bottom center'
  position: positions.TOP_CENTER,
  timeout: 4000,
  offset: '30px',
  // you can also just use 'scale'
  transition: transitions.FADE,
  containerStyle: {
    outerWidth: "80%",
    innerWidth: "80%"
  }
}

ReactDOM.render(
  <AlertProvider template={AlertTemplate} {...options}>
    <App />
  </AlertProvider>
  ,  document.getElementById('root')
);
registerServiceWorker();





//in the oiriginal file:
//import * as serviceWorker from './serviceWorker';
/*
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
*/