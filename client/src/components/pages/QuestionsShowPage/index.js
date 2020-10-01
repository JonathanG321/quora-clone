import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { withRouterPropTypes } from '../../../PropTypes/withRouterPropTypes';
import QuestionDetails from './QuestionDetails';
import AnswerList from './AnswerList';
import { Question } from '../../../requests/question';
import { Answer } from '../../../requests/answer';
import Loading from '../../common/Loading';
import './index.scss';

class QuestionsShowPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      question: null,
      relatedQuestions: [],
    };
    this.submitAnswer = this.submitAnswer.bind(this);
  }
  async componentDidMount() {
    const { id } = this.props.match.params;
    this.setup(id);
  }
  componentDidUpdate(oldProps, oldState) {
    if (oldProps.match.params.id !== this.props.match.params.id) {
      this.setup(this.props.match.params.id);
    }
  }
  async setup(id) {
    const question = await Question.one(id);
    const relatedQuestions = await Question.related(question.spaceId);
    this.setState({ question, isLoading: false, relatedQuestions });
  }
  async submitAnswer(answerData) {
    const { id } = this.props.match.params;
    const { question } = this.state;
    const newAnswer = await Answer.create(answerData, id);
    const answers = [newAnswer].concat(question.answers);
    question.answers = answers;
    this.setState({ question });
  }
  render() {
    const { question, isLoading, relatedQuestions, user } = this.state;
    if (isLoading) {
      return <Loading />;
    }
    if (!question) {
      return <h1>Question doesn't exist!</h1>;
    }
    return (
      <main className="QuestionsShowPage ml-5 mr-5 row">
        <div className="col-7 mt-4">
          <QuestionDetails {...question} currentUser={user} submitAnswer={this.submitAnswer} />
          <AnswerList answers={question.answers} />
        </div>
        <div className="col-5 mt-4">
          <h5 className="mb-0">Related Questions</h5>
          <hr />
          <ul>
            {relatedQuestions.map((question) => {
              return (
                <li key={question.id}>
                  <Link className="question-link" to={`/questions/${question.id}`}>
                    <strong>{question.title}</strong>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </main>
    );
  }
}

QuestionsShowPage.propTypes = {
  ...withRouterPropTypes({
    paramsPropTypes: {
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    },
  }),
};

export default withRouter(QuestionsShowPage);
