import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Main from './pages/Main';
import Account from './pages/Account';
import Book from './pages/Book';
import BooksState from './contexts/BooksContext';
import AuthState from './contexts/AuthContext';
import setAuthToken from './setAuthToken';
import ProtectedRoute from './ProtectedRoute';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <AuthState>
      <BooksState>
        <Router>
          <Switch>
            <Route exact path='/' component={Login}/>
            <Route exact path='/register' component={Register}/>
            <ProtectedRoute exact path='/main' component={Main}/>
            <ProtectedRoute exact path='/account' component={Account}/>
            <ProtectedRoute exact path='/book/:id' component={Book}/>
          </Switch>
        </Router>
      </BooksState>
    </AuthState>
  );
}

export default App;
