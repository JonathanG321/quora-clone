import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Fa from '../Fa';
import Replies from '../Replies';
import { Reply } from '../../../requests/reply';
import Loading from '../Loading';
import './styles.scss';

class QuestionCard extends Component {
  constructor(props) {
    super(props);
    const { question } = props;
    this.state = {
      isLoading: true,
      question,
      limit: 3,
      offset: 0,
      showReplies: false,
    };
    this.onSubmitReplyForm = this.onSubmitReplyForm.bind(this);
    this.onClickLoadReplies = this.onClickLoadReplies.bind(this);
    this.toggleReplies = this.toggleReplies.bind(this);
  }
  componentDidMount() {
    this.setState({ isLoading: false });
  }
  async onSubmitReplyForm(newReply, answerId, questionId) {
    const reply = await Reply.create(newReply, answerId, questionId);
    this.addReplyToState(reply, answerId);
  }
  async onClickLoadReplies(limit, offset, answerId, questionId) {
    const replies = await Reply.get(answerId, questionId, limit, offset);
    this.addRepliesToState(replies, answerId, limit);
  }
  addRepliesToState(replies, answerId, limit) {
    this.setState((state) => ({
      question: {
        ...state.question,
        answers: state.question.answers.map((answer) => {
          if (answer.id !== answerId) {
            return answer;
          }
          return { ...answer, replies: answer.replies.concat(replies) };
        }),
      },
      offset: state.offset + limit,
    }));
  }
  toggleReplies() {
    this.setState((state) => ({
      offset: 0,
      showReplies: !state.showReplies,
    }));
  }
  addReplyToState(reply, answerId) {
    this.setState((state) => ({
      question: {
        ...state.question,
        answers: state.question.answers.map((answer) => {
          if (answer.id !== answerId) {
            return answer;
          }
          return { ...answer, replies: [reply].concat(answer.replies) };
        }),
      },
      offset: state.offset + 1,
    }));
  }
  render() {
    const { question, isLoading, limit, offset, showReplies } = this.state;
    const answers = question.answers
      .concat([])
      .sort((a, b) => calcVoteCount(b.votes) - calcVoteCount(a.votes));
    if (isLoading) {
      return <Loading />;
    }
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
            <Replies
              replies={answers[0].replies}
              onSubmitReplyForm={this.onSubmitReplyForm}
              answerId={answers[0].id}
              questionId={question.id}
              limit={limit}
              offset={offset}
              onClickLoadReplies={() =>
                this.onClickLoadReplies(limit, offset, answers[0].id, question.id)
              }
            />
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
