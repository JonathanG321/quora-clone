import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import Loading from '../Loading';
import { Question } from '../../../requests/question';
import { Dislike } from '../../../requests/dislike';
import { User } from '../../../requests/user';
import { Answer } from '../../../requests/answer';
import Fa from '../Fa';
import AnswerForm from '../../common/AnswerForm';
import './styles.scss';

class QuestionsCard extends Component {
  constructor(props) {
    super(props);
    const { id, spaceName, body, title, answers, showBody = false } = props;
    this.state = {
      isLoading: true,
      id,
      spaceName,
      title,
      answers,
      showBody,
      body,
      showAnswerForm: false,
      user: null,
    };
    this.toggleAnswerForm = this.toggleAnswerForm.bind(this);
    this.submitAnswer = this.submitAnswer.bind(this);
  }
  async componentDidMount() {
    const { id } = this.state;
    const question = await Question.one(id);
    this.setVote(id);
    this.setCurrentUser();
    this.setState({ isLoading: false, dislikes: question.dislikes });
  }
  async submitAnswer(answerData) {
    const { id } = this.state;
    await Answer.create(answerData, id);
  }
  toggleAnswerForm() {
    this.setState((state) => ({
      showAnswerForm: !state.showAnswerForm,
    }));
  }
  async setVote(questionId) {
    const userDislike = await Dislike.getDislike(questionId);
    if (!!userDislike) {
      this.setState({ userDislike });
    }
  }
  async dislike(questionId) {
    const userDislike = await Dislike.dislike(questionId);
    const newQuestion = await Question.one(questionId);
    this.setState({ userDislike, dislikes: newQuestion.dislikes });
  }
  async unDislike(questionId) {
    const dislike = await Dislike.unDislike(questionId);
    const newQuestion = await Question.one(questionId);
    this.setState({ userDislike: false, dislikes: newQuestion.dislikes });
  }
  async setCurrentUser() {
    await User.getCurrentUser().then(async (user) => {
      if (!!user.id) {
        this.setState({ user });
      }
    });
  }
  render() {
    const {
      id,
      spaceName,
      title,
      answers,
      userDislike,
      dislikes,
      isLoading,
      body,
      showBody,
      showAnswerForm,
      user,
    } = this.state;
    if (isLoading) {
      return <Loading />;
    }
    return (
      <li className="border-bottom pt-3 pl-3 pr-3 pb-2">
        <div className="stamp">Question Added • {spaceName}</div>
        <Link className="question-link" to={`/questions/${id}`}>
          <h5>
            <strong>{title}</strong>
          </h5>
        </Link>
        {showBody && <div>{body}</div>}
        <div>{answers.length} Answers</div>
        <div className="d-flex justify-content-between">
          <button
            onClick={this.toggleAnswerForm}
            className=" answer-button collapse-button comments-button d-flex align-items-center justify-content-center"
            type="button"
          >
            <Fa type="r" size="lg" kind="edit" color="blue" />
            {' Answer'}
          </button>
          <div className="d-flex align-items-center">
            <div
              onClick={!!userDislike ? () => this.unDislike(id) : () => this.dislike(id)}
              className="dislike-button ml-1 d-flex justify-content-center align-items-center"
            >
              <Fa type="r" size="lg" kind="thumbs-down" color={!!userDislike ? 'red' : 'black'} />
            </div>
            <div className="d-flex align-items-center">{dislikes.length}</div>
          </div>
        </div>
        {showAnswerForm && <AnswerForm user={user} onSubmit={this.submitAnswer} />}
      </li>
    );
  }
}

QuestionsCard.propTypes = {
  questions: PropTypes.arrayOf(
    PropTypes.shape({
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
  ),
  onSubmitReplyForm: PropTypes.func.isRequired,
};

QuestionsCard.defaultProps = {
  question: {},
  onSubmitReplyForm: () => {},
};

export default withRouter(QuestionsCard);
