import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from './contexts/AuthContext';

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const authContext = useContext(AuthContext);
    const { state: { isAuthenticated, loading } } = authContext;
    return (
      <Route {...rest} render={props => 
        !isAuthenticated && !loading ? (
          <Redirect to='/'/>
      ) : (<Component {...props}/>)}/>  
    );
}

export default ProtectedRoute;