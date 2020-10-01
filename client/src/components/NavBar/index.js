import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { withRouterPropTypes } from '../../PropTypes/withRouterPropTypes';
import { Session } from '../../requests/session';
import Fa from '../common/Fa';
import Logo from '../common/Logo';
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
    <div>
      <nav className="red d-flex justify-content-center d-md-none">
        <div className="navbar-brand">
          <Logo color="logo-fill-white" />
        </div>
      </nav>
      <nav className="nav navbar navbar-light bg-light navbar-shadow">
        <div className="container-fluid justify-content-between d-flex">
          <div className="navbar-brand d-none d-md-block">
            <Logo />
          </div>
          <div className="nav-item">
            <NavLink
              className="nav-link align-items-center d-flex justify-content-center"
              exact
              to="/"
            >
              <Fa kind={'home'} size="lg" />
              <strong className="ml-1 d-none d-md-block">Home</strong>
            </NavLink>
          </div>
          <div className="nav-item">
            <NavLink
              className="nav-link align-items-center d-flex justify-content-center"
              exact
              to="/answers"
            >
              <Fa type="r" kind={'edit'} size="lg" />
              <strong className="ml-1 d-none d-md-block">Answer</strong>
            </NavLink>
          </div>
          <div className="nav-item">
            <NavLink
              className="nav-link align-items-center d-flex justify-content-center"
              exact
              to="/spaces"
            >
              <Fa kind={'users'} size="lg" />
              <strong className="ml-1 d-none d-md-block">Spaces</strong>
            </NavLink>
          </div>
          <div className="nav-item">
            <NavLink
              className="nav-link align-items-center d-flex justify-content-center"
              exact
              to="/topics"
            >
              <Fa kind={'comments'} size="lg" />
              <strong className="ml-1 d-none d-md-block">Topics</strong>
            </NavLink>
          </div>
          {!isSignedIn && (
            <>
              <div className="nav-item">
                <NavLink
                  className="nav-link align-items-center d-flex justify-content-center"
                  exact
                  to="/sign-in"
                >
                  <strong>Sign In</strong>
                </NavLink>
              </div>
              <div className="nav-item">
                <NavLink
                  className="nav-link align-items-center d-flex justify-content-center"
                  exact
                  to="/sign-up"
                >
                  <strong>Sign Up</strong>
                </NavLink>
              </div>
            </>
          )}
          {isSignedIn && (
            <>
              <div className="nav-item d-flex justify-content-center align-items-center ">
                <img className="align-items-center avatar" src={user.avatar} />
              </div>
              <div className="nav-item">
                <a
                  className="nav-link align-items-center d-flex justify-content-center"
                  href="/sign-out"
                  onClick={handleSignOut}
                >
                  <strong>Sign Out</strong>
                </a>
              </div>
            </>
          )}
          <div>
            <button
              className="align-items-center d-flex justify-content-center ml-2 add-question-button"
              to="/topics"
            >
              <NavLink className="hide-styling" exact to="/add-question">
                <strong>Add Question</strong>
              </NavLink>
            </button>
          </div>
        </div>
      </nav>
    </div>
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
