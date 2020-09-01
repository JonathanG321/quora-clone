import React from 'react';
import PropTypes from 'prop-types';
import Fa from '../../common/Fa';

function AnswerDetails(props) {
  const { user, createdAt, body } = props;
  return (
    <div className="AnswerDetails">
      <p>
        {user.firstName} {user.lastName}
      </p>
      <p>{new Date(createdAt).toLocaleDateString()}</p>
      {body && <p>{body}</p>}
      <div className="d-flex">
        <div className="dislike-button d-flex justify-content-center align-items-center">
          <Fa type="r" size="lg" kind="arrow-alt-circle-up" color="blue" />
        </div>
        <div className="dislike-button d-flex justify-content-center align-items-center">
          <Fa type="r" size="lg" kind="arrow-alt-circle-down" />
        </div>
      </div>
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
};

AnswerDetails.defaultProps = {
  isRed: false,
  body: '',
};

export default AnswerDetails;
