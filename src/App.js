import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import Nav from './components/Nav';
import Home from './containers/Home';
import Favourites from './containers/Favourites';
import AdvancedSearch from './containers/AdvancedSearch';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

const store = configureStore();

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Nav>
        <Route path="/" exact={true} component={Home} />
        <Route path="/favourites" component={Favourites} />
        <Route path="/search" component={AdvancedSearch} />
      </Nav>
    </BrowserRouter>
  </Provider>
);

export default App;