import React from 'react';
import { Dashboard, Login, PrivateRoute, AuthWrapper, Error } from './pages';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          {' '}
          <Dashboard></Dashboard>
        </Route>
        <Route exact path='/login'>
          {' '}
          <Login />
        </Route>
        <Route>
          {' '}
          <Error exact path='*' />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
