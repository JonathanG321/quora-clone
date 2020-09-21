import React from 'react';
import PropTypes from 'prop-types';
import { withRouterPropTypes } from '../../../PropTypes/withRouterPropTypes';
import { withRouter } from 'react-router-dom';
import { Session } from '../../../requests/session';

function SignInPage(props) {
  const { onSignIn } = props;
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const credentials = {
      email: formData.get('email'),
      password: formData.get('password'),
    };
    Session.create(credentials).then(({ id, errors }) => {
      if (id && !errors) {
        onSignIn();
        props.history.push('/');
      } else {
        alert('Login Failed');
      }
    });
  }
  return (
    <div className="ml-3 mr-3">
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input className="form-control" type="email" name="email" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input className="form-control" type="password" name="password" />
        </div>
        <input className="btn btn-outline-primary" type="submit" value="Login" />
      </form>
    </div>
  );
}

SignInPage.propTypes = {
  ...withRouterPropTypes(),
  onSignIn: PropTypes.func.isRequired,
};

export default withRouter(SignInPage);
