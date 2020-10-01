import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Fa from '../../common/Fa';
import Loading from '../../common/Loading';
import { Question } from '../../../requests/question';
import { Dislike } from '../../../requests/dislike';
import AnswerForm from '../../common/AnswerForm';
import { User } from '../../../requests/user';

class QuestionDetails extends Component {
  constructor(props) {
    super(props);
    const { createdAt, body, id, tags, title } = props;
    this.state = {
      user: null,
      createdAt,
      id,
      body,
      tags,
      title,
      dislikes: [],
      userDislike: false,
      isLoading: true,
      showAnswerForm: false,
    };
    this.Dislike = this.dislike.bind(this);
    this.unDislike = this.unDislike.bind(this);
    this.toggleAnswerForm = this.toggleAnswerForm.bind(this);
  }
  async componentDidMount() {
    const { id } = this.state;
    const question = await Question.one(id);
    this.setVote(id);
    this.setCurrentUser();
    this.setState({ isLoading: false, dislikes: question.dislikes });
  }
  async setCurrentUser() {
    await User.getCurrentUser().then(async (user) => {
      if (!!user.id) {
        this.setState({ user });
      }
    });
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
  render() {
    const {
      title,
      body,
      tags,
      createdAt,
      user,
      userDislike,
      dislikes,
      isLoading,
      id,
      showAnswerForm,
    } = this.state;
    const { submitAnswer } = this.props;
    if (isLoading) {
      return <Loading />;
    }
    return (
      <div className="QuestionDetails">
        {tags.map((tag) => (
          <a href={`/tags/${tag.id}`} key={tag.id} className="tag mr-2">
            {tag.name}
          </a>
        ))}
        <h3>
          <strong>{title}</strong>
        </h3>
        <p>{body}</p>
        <p>
          {new Date(createdAt).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
        <div className="d-flex">
          <button
            onClick={this.toggleAnswerForm}
            className=" answer-button collapse-button comments-button d-flex align-items-center justify-content-center"
            type="button"
          >
            <Fa type="r" size="lg" kind="edit" color="blue" />
            {' Answer'}
          </button>
          <div
            onClick={!!userDislike ? () => this.unDislike(id) : () => this.dislike(id)}
            className="dislike-button ml-1 d-flex justify-content-center align-items-center"
          >
            <Fa type="r" size="lg" kind="thumbs-down" color={!!userDislike ? 'red' : 'black'} />
          </div>
          <div className="d-flex align-items-center">{dislikes.length}</div>
        </div>
        {showAnswerForm && <AnswerForm user={user} onSubmit={submitAnswer} />}
        <hr />
      </div>
    );
  }
}

QuestionDetails.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ),
  user: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
  }).isRequired,
};

export default QuestionDetails;
