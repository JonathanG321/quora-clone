import React from 'react';
import PropTypes from 'prop-types';
import Fa from '../Fa';
import './styles.scss';

function FollowButton(props) {
  const { onFollow, onUnFollow, isFollowed, follows } = props;
  if (isFollowed) {
    return (
      <button
        onClick={onUnFollow}
        className="btn btn-sm btn-secondary d-flex justify-content-around align-items-center pt-1 pb-1"
      >
        <Fa kind="check" />
        <span> Followed </span>
        <span> {follows.length}</span>
      </button>
    );
  }
  return (
    <button
      onClick={onFollow}
      className="btn btn-sm btn-outline-primary d-flex justify-content-around align-items-center pt-1 pb-1"
    >
      <Fa kind="plus" />
      <span> Follow </span>
      <span> {follows.length}</span>
    </button>
  );
}

FollowButton.propTypes = {
  onFollow: PropTypes.func.isRequired,
  onUnFollow: PropTypes.func.isRequired,
};

export default FollowButton;
