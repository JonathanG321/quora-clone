import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Fa from '../Fa';
import './styles.scss';

function QuestionCard(props) {
  const { question } = props;
  const answers = question.answers
    .concat([])
    .sort((a, b) => calcVoteCount(b.votes) - calcVoteCount(a.votes));
  return (
    <div className="card mb-2">
      <div className="card-body">
        <div>
          {answers[0].user.firstName} {answers[0].user.lastName}
        </div>
        <Link className="question-link" to={`/questions/question.id`}>
          <strong>{question.title}</strong>
        </Link>
        <div>{answers[0].body}</div>
        <div className="d-flex align-items-center">
          <div className="dislike-button d-flex justify-content-center align-items-center">
            <Fa type="r" size="lg" kind="arrow-alt-circle-up" color="blue" />
          </div>
          <div className="dislike-button d-flex justify-content-center align-items-center">
            <Fa type="r" size="lg" kind="arrow-alt-circle-down" />
          </div>
          <div className="ml-1">{calcVoteCount(answers[0].votes)}</div>
        </div>
      </div>
    </div>
  );
}

function calcVoteCount(votes) {
  return votes.reduce((acc, vote) => (vote.isUpVote ? acc + 1 : acc - 1), 0);
}

QuestionCard.propTypes = {
  question: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    answers: PropTypes.arrayOf(
      PropTypes.shape({
        body: PropTypes.string.isRequired,
        replies: PropTypes.arrayOf(
          PropTypes.shape({
            body: PropTypes.string.isRequired,
          }),
        ),
        votes: PropTypes.arrayOf(
          PropTypes.shape({
            isUpVote: PropTypes.bool.isRequired,
          }),
        ),
      }),
    ).isRequired,
  }),
};

QuestionCard.defaultProps = {
  question: {},
};

export default QuestionCard;
