import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

function LoadMoreRepliesButton(props) {
  const { onClick } = props;
  return (
    <div className="load-more-button d-flex justify-content-center align-items-center">
      <button onClick={onClick}>Load More Replies</button>
    </div>
  );
}

LoadMoreRepliesButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  offset: PropTypes.number.isRequired,
  limit: PropTypes.number.isRequired,
};

LoadMoreRepliesButton.defaultProps = {
  onSubmit: () => {},
  offset: 0,
  limit: 3,
};

export default LoadMoreRepliesButton;
