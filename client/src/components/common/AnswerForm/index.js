import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

function AnswerForm(props) {
  const { onSubmit, user } = props;
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newAnswer = {
      body: formData.get('body'),
    };
    event.currentTarget.reset();
    onSubmit(newAnswer);
  }
  return (
    <div className="answer-form mt-2 card">
      <div className="card-header d-flex align-items-center">
        <img className="user-avatar" src={user.avatar} />
        <div className="ml-2">
          {user.firstName} {user.lastName}
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          className="card-body  answer-text"
          type="textarea"
          name="body"
          placeholder="Write your answer"
        />
        <div className="d-flex align-items-center card-footer">
          <input type="submit" className="btn btn-primary" value="Submit" />
        </div>
      </form>
    </div>
  );
}

AnswerForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default AnswerForm;
