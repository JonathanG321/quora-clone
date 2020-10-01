import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Fa from '../Fa';
import Replies from '../Replies';
import Loading from '../Loading';
import { Question } from '../../../requests/question';
import { Answer } from '../../../requests/answer';
import { Vote } from '../../../requests/vote';
import './styles.scss';

class AnswerCard extends Component {
  constructor(props) {
    super(props);
    const { question } = props;
    this.state = {
      isLoading: true,
      question,
      showReplies: false,
      answer: null,
      vote: null,
    };
    this.toggleReplies = this.toggleReplies.bind(this);
    this.vote = this.vote.bind(this);
    this.unVote = this.unVote.bind(this);
  }
  async componentDidMount() {
    const { question } = this.state;
    const fullQuestion = await Question.oneCard(question.id);
    fullQuestion.answers.sort((a, b) => calcVoteCount(b.votes) - calcVoteCount(a.votes));
    if (!!fullQuestion.answers.length) {
      this.setVote(fullQuestion.answers[0].id);
    }
    this.setState({ isLoading: false, question: fullQuestion, answer: fullQuestion.answers[0] });
  }
  async setVote(answerId) {
    const vote = await Vote.getVote(answerId);
    if (!!vote) {
      this.setState({ vote });
    }
  }
  async vote(isUpVote, answerId) {
    const vote = await Vote.vote(isUpVote, answerId);
    const newAnswer = await Answer.one(answerId);
    this.setState({ vote, answer: newAnswer });
  }
  async unVote(answerId) {
    const vote = await Vote.unVote(answerId);
    const newAnswer = await Answer.one(answerId);
    this.setState({ vote: null, answer: newAnswer });
  }
  toggleReplies() {
    this.setState((state) => ({
      showReplies: !state.showReplies,
    }));
  }
  render() {
    const { question, isLoading, showReplies, vote, answer } = this.state;
    if (isLoading) {
      return <Loading />;
    }
    if (!question.answers.length) {
      return <div></div>;
    }
    return (
      <div className="card mb-2">
        <div className="card-body">
          <div className="stamp">Answer • {question.spaceName}</div>
          <div>
            {answer.user.firstName} {answer.user.lastName}
          </div>
          <Link className="question-link" to={`/questions/${question.id}`}>
            <strong>{question.title}</strong>
          </Link>
          <div>{answer.body}</div>
          <div className="d-flex align-items-center">
            <div
              onClick={
                !!vote && vote.isUpVote
                  ? () => this.unVote(answer.id)
                  : () => this.vote(true, answer.id)
              }
              className="dislike-button mr-2 d-flex justify-content-center align-items-center"
            >
              <Fa
                type="r"
                size="lg"
                kind="arrow-alt-circle-up"
                color={!!vote && vote.isUpVote ? 'blue' : 'black'}
              />
            </div>
            <div
              onClick={
                !!vote && !vote.isUpVote
                  ? () => this.unVote(answer.id)
                  : () => this.vote(false, answer.id)
              }
              className="dislike-button d-flex justify-content-center align-items-center"
            >
              <Fa
                type="r"
                size="lg"
                kind="arrow-alt-circle-down"
                color={!!vote && !vote.isUpVote ? 'red' : 'black'}
              />
            </div>
            <div className="ml-1">{calcVoteCount(answer.votes)}</div>
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
            <Replies answerId={answer.id} />
          </div>
        )}
      </div>
    );
  }
}

function calcVoteCount(votes) {
  return votes.reduce((acc, vote) => (vote.isUpVote ? acc + 1 : acc - 1), 0);
}

AnswerCard.propTypes = {
  question: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
  }),
  onSubmitReplyForm: PropTypes.func.isRequired,
};

AnswerCard.defaultProps = {
  question: {},
  onSubmitReplyForm: () => {},
};

export default AnswerCard;
