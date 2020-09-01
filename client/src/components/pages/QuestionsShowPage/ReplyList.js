import React from 'react';
import PropTypes from 'prop-types';
import ReplyDetails from './ReplyDetails';

function ReplyList(props) {
  const { replies } = props;
  return (
    <div className="ReplyList ml-5">
      <ul className="replies">
        {replies.map((reply) => (
          <li key={reply.id}>
            <ReplyDetails user={reply.user} createdAt={reply.createdAt} body={reply.body} />
          </li>
        ))}
      </ul>
    </div>
  );
}

ReplyList.propTypes = {
  replies: PropTypes.arrayOf(
    PropTypes.shape({
      ...ReplyDetails.propTypes,
      id: PropTypes.number.isRequired,
    }),
  ),
};

export default ReplyList;
