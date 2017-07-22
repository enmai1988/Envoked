import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Spinner from './spinner.jsx';

const PrivateRoute = ({ component: Component, session, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (session.fetched && session.isLoggedIn) {
          return <Component {...props}/>;
        } else if (session.fetched && !session.isLoggedIn) {
          return <Redirect to={{pathname: '/auth/login', state: {from: props.location}}}></Redirect>;
        } else {
          return <Spinner/>;
        }
      }}
    >
    </Route>
  );
};

export default PrivateRoute;
