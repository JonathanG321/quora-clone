import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Fa from '../Fa';
import Loading from '../Loading';
import './styles.scss';
import { Question } from '../../../requests/question';

class QuestionsCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      questions: [],
    };
  }
  async componentDidMount() {
    const questions = await Question.findNew();
    this.setState({ isLoading: false, questions });
  }
  render() {
    const { questions, isLoading } = this.state;
    if (isLoading) {
      return <Loading />;
    }
    return (
      <div className="card">
        <div className="card-body">
          <div className="star-block">★</div>
        </div>
        <div className="card-body">{questions.forEach((question) => {})}</div>
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
