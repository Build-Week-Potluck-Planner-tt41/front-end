import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom'
import './index.css';
import App from './App';

import thunk from 'redux-thunk'
import { applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'
import { potluckReducer } from './reducers/potlucksReducer';


const store = createStore(potluckReducer, applyMiddleware(thunk));


ReactDOM.render(

  <Provider store={store}>
  <Router>
  <App />
  </Router>
  </Provider>,
 document.getElementById('root')
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

