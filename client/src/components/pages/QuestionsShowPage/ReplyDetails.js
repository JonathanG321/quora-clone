import React from 'react';
import PropTypes from 'prop-types';

function ReplyDetails(props) {
  const { user, createdAt, body } = props;
  return (
    <div className="ReplyDetails">
      <p>
        {user.firstName} {user.lastName}
      </p>
      <p>{new Date(createdAt).toLocaleDateString()}</p>
      {body && <p>{body}</p>}
    </div>
  );
}

ReplyDetails.propTypes = {
  id: PropTypes.number,
  user: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
  createdAt: PropTypes.string.isRequired,
  body: PropTypes.string,
};

ReplyDetails.defaultProps = {
  isRed: false,
  body: '',
};

export default ReplyDetails;
