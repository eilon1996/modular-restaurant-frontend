import React, { Component } from 'react';
// the next comment allow the compiler to ignore the problem
import Main from './component/Main';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Store } from './redux/Store';

require('dotenv').config()

const store = Store();
  
class App extends Component{


  render(){
    return(
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Main/>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}
export default App;
