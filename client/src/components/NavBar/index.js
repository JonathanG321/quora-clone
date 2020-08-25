import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { withRouterPropTypes } from '../../PropTypes/withRouterPropTypes';
import { Session } from '../../requests/session';

import './styles.scss';

function NavBar(props) {
  const { user, onSignOut } = props;
  const isSignedIn = !!user;
  function handleSignOut(event) {
    event.preventDefault();
    Session.destroy().then(() => {
      onSignOut();
      props.history.push('/');
    });
  }
  return (
    <nav className="nav navbar navbar-light bg-light left nav-pills">
      <div className="navbar-brand">
        <strong>Quora</strong>
      </div>
      <div className="nav-item">
        <NavLink className="nav-link" exact to="/">
          <strong>Home</strong>
        </NavLink>
      </div>
      {!isSignedIn && (
        <>
          <div className="nav-item">
            <NavLink className="nav-link" exact to="/sign-in">
              <strong>Sign In</strong>
            </NavLink>
          </div>
          <div className="nav-item">
            <NavLink className="nav-link" exact to="/sign-up">
              <strong>Sign Up</strong>
            </NavLink>
          </div>
        </>
      )}
      <div className="right">
        {isSignedIn && (
          <>
            <div className="nav-item">
              <div className="nav-link">
                <strong>{user.firstName}</strong>
              </div>
            </div>
            <div className="nav-item">
              <a className="nav-link" href="/sign-out" onClick={handleSignOut}>
                <strong>Sign Out</strong>
              </a>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}

NavBar.propTypes = {};

NavBar.defaultProps = {};

export default withRouter(NavBar);
