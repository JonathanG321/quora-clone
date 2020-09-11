import React from 'react';
import PropTypes from 'prop-types';
import ReplyForm from '../ReplyForm';
import { Link } from 'react-router-dom';
import './styles.scss';

function Replies(props) {
  const { replies, onSubmitReplyForm, answerId, questionId } = props;
  return (
    <div>
      <ReplyForm onSubmit={onSubmitReplyForm} answerId={answerId} questionId={questionId} />
      {replies.map((reply, index) => {
        return (
          <div key={index} className="reply-card card-body pb-3">
            {reply.user.firstName} {reply.user.lastName}
            <span className="date">
              {' '}
              •{' '}
              {new Date(reply.createdAt).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
            <div>{reply.body}</div>
          </div>
        );
      })}
    </div>
  );
}

Replies.propTypes = {
  replies: PropTypes.arrayOf(
    PropTypes.shape({
      body: PropTypes.string.isRequired,
      user: PropTypes.shape({
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
      }).isRequired,
    }),
  ),
  onSubmitReplyForm: PropTypes.func.isRequired,
  answerId: PropTypes.number.isRequired,
};

Replies.defaultProps = {
  replies: [],
  onSubmitReplyForm: () => {},
};

export default Replies;
