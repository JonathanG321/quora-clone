import React from 'react';
import PropTypes from 'prop-types';
import AnswerDetails from './AnswerDetails';

function AnswerList(props) {
  const { answers } = props;
  return (
    <div className="AnswerList">
      <ul className="answers">
        {answers.map((answer) => (
          <li className="answer" key={answer.id}>
            <AnswerDetails
              id={answer.id}
              user={answer.user}
              createdAt={answer.createdAt}
              body={answer.body}
            />
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
