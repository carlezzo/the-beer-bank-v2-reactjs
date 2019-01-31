import React from 'react';
import ReactDOM from 'react-dom';
import './styles/scss/index.scss';
import App from './App';
import Favourites from './containers/Favourites';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route } from 'react-router-dom'
import Nav from './components/Nav';

ReactDOM.render(
  <BrowserRouter>
    <Nav>
      <Route path="/" exact={true} component={App} />
      <Route path="/favourites" component={Favourites} />
    </Nav>
  </BrowserRouter>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
