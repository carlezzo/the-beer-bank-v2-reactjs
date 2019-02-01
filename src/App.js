import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import Nav from './components/Nav';
import Home from './containers/Home';
import Favourites from './containers/Favourites';

const App = () => (
  <BrowserRouter>
    <Nav>
      <Route path="/" exact={true} component={Home} />
      <Route path="/favourites" component={Favourites} />
    </Nav>
  </BrowserRouter>
);

export default App;