import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function FollowsDisplay(props) {
  const { follows } = props;
  return (
    <ul>
      <li className="max-width">
        <Link className="mt-1 mb-1 follow-list-item" to={`/`}>
          Feed
        </Link>
      </li>
      {follows.map((follow, id) => {
        return (
          <li key={id} className="max-width">
            <Link className="mt-1 mb-1 follow-list-item" to={`/${follow.type}/${follow.id}`}>
              {follow.name}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

FollowsDisplay.propTypes = {
  follows: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.oneOf(['spaces', 'topics']),
    }),
  ),
};

FollowsDisplay.defaultProps = {
  follows: {},
};

export default FollowsDisplay;
