import React from 'react';
import PropTypes from 'prop-types';
import AnswerDetails from './AnswerDetails';

function AnswerList(props) {
  const { answers } = props;
  return (
    <div className="AnswerList">
      <ul>
        {answers.map((answer) => (
          <li key={answer.id}>
            <AnswerDetails user={answer.user} createdAt={answer.createdAt} body={answer.body} />
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
