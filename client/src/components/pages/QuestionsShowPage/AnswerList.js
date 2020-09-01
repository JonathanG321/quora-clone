import React from 'react';
import PropTypes from 'prop-types';
import AnswerDetails from './AnswerDetails';
import ReplyList from './ReplyList';

function AnswerList(props) {
  const { answers } = props;
  return (
    <div className="AnswerList">
      <ul className="answers">
        {answers.map((answer) => (
          <li className="answer" key={answer.id}>
            <AnswerDetails user={answer.user} createdAt={answer.createdAt} body={answer.body} />
            <ReplyList replies={answer.replies} />
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
}

AnswerList.propTypes = {
  answers: PropTypes.arrayOf(
    PropTypes.shape({
      ...AnswerDetails.propTypes,
      id: PropTypes.number.isRequired,
    }),
  ),
};

export default AnswerList;
