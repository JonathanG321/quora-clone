import React from 'react';
import PropTypes from 'prop-types';

function QuestionDetails(props) {
  const { title, body, createdAt, user } = props;
  return (
    <div className="QuestionDetails">
      <h1>{title}</h1>
      <p>{body}</p>
      <p>Created at: {new Date(createdAt).toLocaleDateString()}</p>
      <p>
        Author: {user.firstName} {user.lastName}
      </p>
    </div>
  );
}

QuestionDetails.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  user: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
  }).isRequired,
};

export default QuestionDetails;
