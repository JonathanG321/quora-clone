import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

function AuthRoute(props) {
  const { isSignedIn, children, ...routeProps } = props;
  return <Route {...routeProps}>{isSignedIn ? children : <Redirect to="/sign-in" />}</Route>;
}

AuthRoute.propTypes = {
  isSignedIn: PropTypes.bool,
};

AuthRoute.defaultProps = {
  isSignedIn: false,
};

export default AuthRoute;
