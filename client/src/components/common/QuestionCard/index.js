import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Fa from '../Fa';
import Replies from '../Replies';
import Loading from '../Loading';
import './styles.scss';
import { Question } from '../../../requests/question';

class QuestionCard extends Component {
  constructor(props) {
    super(props);
    const { question } = props;
    this.state = {
      isLoading: true,
      question,
      showReplies: false,
    };
    this.toggleReplies = this.toggleReplies.bind(this);
  }
  async componentDidMount() {
    const { question } = this.state;
    const fullQuestion = await Question.oneCard(question.id);
    this.setState({ isLoading: false, question: fullQuestion });
  }
  toggleReplies() {
    this.setState((state) => ({
      showReplies: !state.showReplies,
    }));
  }
  render() {
    const { question, isLoading, showReplies } = this.state;
    if (isLoading) {
      return <Loading />;
    }
    const answers = question.answers
      .concat([])
      .sort((a, b) => calcVoteCount(b.votes) - calcVoteCount(a.votes));
    return (
      <div className="card mb-2">
        <div className="card-body">
          <div>
            {answers[0].user.firstName} {answers[0].user.lastName}
          </div>
          <Link className="question-link" to={`/questions/${question.id}`}>
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
            <button
              onClick={this.toggleReplies}
              className="collapse-button dislike-button comments-button d-flex align-items-center ml-2 justify-content-center"
              type="button"
            >
              <Fa kind="comment" type="r" />
            </button>
          </div>
        </div>
        {showReplies && (
          <div className="" id="comments">
            <Replies answerId={answers[0].id} />
          </div>
        )}
      </div>
    );
  }
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
  onSubmitReplyForm: PropTypes.func.isRequired,
};

QuestionCard.defaultProps = {
  question: {},
  onSubmitReplyForm: () => {},
};

export default QuestionCard;
