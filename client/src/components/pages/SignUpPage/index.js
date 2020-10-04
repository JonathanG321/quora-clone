import React from 'react';
import PropTypes from 'prop-types';
import { withRouterPropTypes } from '../../../PropTypes/withRouterPropTypes';
import { withRouter } from 'react-router-dom';
import { User } from '../../../requests/user';

function SignUpPage(props) {
  const { onSignUp } = props;
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newUser = {
      firstName: formData.get('first-name'),
      lastName: formData.get('last-name'),
      email: formData.get('email'),
      avatar: formData.get('avatar'),
      password: formData.get('password'),
      passwordConfirmation: formData.get('password-confirmation'),
    };
    User.create(newUser).then(({ id, errors }) => {
      if (id && !errors) {
        onSignUp();
        props.history.push('/');
      } else {
        alert('Sign Up Failed');
      }
    });
  }
  return (
    <div className="ml-3 mr-3 mt-2">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="first-name">First Name</label>
          <input className="form-control" type="text" name="first-name" />
        </div>
        <div className="form-group">
          <label htmlFor="last-name">Last Name</label>
          <input className="form-control" type="text" name="last-name" />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input className="form-control" type="email" name="email" />
        </div>
        <div className="form-group">
          <label htmlFor="avatar">User Avatar</label>
          <input
            className="form-control"
            type="url"
            name="avatar"
            placeholder="https://i.kym-cdn.com/entries/icons/original/000/013/564/doge.jpg"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input className="form-control" type="password" name="password" />
        </div>
        <div className="form-group">
          <label htmlFor="password-confirmation">Password Confirmation</label>
          <input className="form-control" type="password" name="password-confirmation" />
        </div>
        <input className="btn btn-outline-primary" type="submit" value="Login" />
      </form>
    </div>
  );
}

SignUpPage.propTypes = {
  ...withRouterPropTypes(),
  onSignUp: PropTypes.func.isRequired,
};

export default withRouter(SignUpPage);
