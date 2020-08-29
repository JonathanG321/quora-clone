import React from 'react';
import PropTypes from 'prop-types';

function AnswerDetails(props) {
  const { user, createdAt, body } = props;
  return (
    <div className="AnswerDetails">
      <p>
        Answer by: {user.firstName} {user.lastName}
      </p>
      <p>{new Date(createdAt).toLocaleDateString()}</p>
      {body && <p>{body}</p>}
    </div>
  );
}

AnswerDetails.propTypes = {
  id: PropTypes.number,
  user: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
  createdAt: PropTypes.string.isRequired,
  body: PropTypes.string,
  isRed: PropTypes.bool,
  onDeleteClick: PropTypes.func,
};

AnswerDetails.defaultProps = {
  isRed: false,
  body: '',
};

export default AnswerDetails;
