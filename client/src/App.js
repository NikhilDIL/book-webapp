import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Main from './pages/Main';
import Account from './pages/Account';
import Book from './pages/Book';
import BooksState from './contexts/BooksContext';

const App = () => {
  return (
    <BooksState>
      <Router>
        <Switch>
          <Route exact path='/' component={Login}/>
          <Route exact path='/register' component={Register}/>
          <Route exact path='/main' component={Main}/>
          <Route exact path='/account' component={Account}/>
          <Route exact path='/book/:id' component={Book}/>
        </Switch>
      </Router>
    </BooksState>
  );
}

export default App;
