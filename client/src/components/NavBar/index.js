import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { withRouterPropTypes } from '../../PropTypes/withRouterPropTypes';
import { Session } from '../../requests/session';
import './styles.scss';
import Fa from '../common/Fa';

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
    <nav className="nav navbar navbar-light bg-light flex justify-content-center">
      <div className="navbar-brand">
        <strong>Quora</strong>
      </div>
      <div className="nav-item">
        <NavLink className="nav-link align-items-center d-flex" exact to="/">
          <Fa kind={'home'} size="2x" color="#7b7b7d" />
          <strong className="ml-1">Home</strong>
        </NavLink>
      </div>
      <div className="nav-item">
        <NavLink className="nav-link align-items-center d-flex" exact to="/answers">
          <Fa kind={'edit'} size="2x" color="#7b7b7d" />
          <strong className="ml-1">Answer</strong>
        </NavLink>
      </div>
      <div className="nav-item">
        <NavLink className="nav-link align-items-center d-flex" exact to="/spaces">
          <Fa kind={'users'} size="2x" color="#7b7b7d" />
          <strong className="ml-1">Spaces</strong>
        </NavLink>
      </div>
      <div className="nav-item">
        <NavLink className="nav-link align-items-center d-flex" exact to="/notifications">
          <Fa kind={'bell'} size="2x" color="#7b7b7d" />
          <strong className="ml-1">Notifications</strong>
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
    </nav>
  );
}

NavBar.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }),
  ...withRouterPropTypes(),
  onSignOut: PropTypes.func,
};

NavBar.defaultProps = {
  onSignOut: () => {},
};

export default withRouter(NavBar);
