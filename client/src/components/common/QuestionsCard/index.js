import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from '../Loading';
import { Question } from '../../../requests/question';
import { Link } from 'react-router-dom';
import Fa from '../Fa';
import QuestionTab from '../QuestionTab';
import './styles.scss';

class QuestionsCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      questions: [],
    };
  }
  async componentDidMount() {
    const questions = await Question.findRecent();
    this.setState({ isLoading: false, questions });
  }
  render() {
    const { questions, isLoading } = this.state;
    if (isLoading) {
      return <Loading />;
    }
    return (
      <div className="card">
        <div className="card-body border-bottom card-padding d-flex align-items-center">
          <div className="star-block d-flex justify-content-center align-items-center">★</div>
          <span className="stamp ml-2">Questions For you</span>
        </div>
        <ul className="mb-0">
          {questions.map((question) => {
            return <QuestionTab key={question.id} {...question} />;
          })}
        </ul>
      </div>
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

export default QuestionsCard;
