import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { withRouterPropTypes } from '../../../PropTypes/withRouterPropTypes';
import QuestionDetails from './QuestionDetails';
import AnswerList from './AnswerList';
import { Question } from '../../../requests/question';
import Loading from '../../common/Loading';
import './index.css';

class QuestionsShowPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      question: null,
    };
  }
  componentDidMount() {
    const { id } = this.props.match.params;
    Question.one(id).then((question) => {
      this.setState({ question, isLoading: false });
    });
  }
  render() {
    const { question, isLoading } = this.state;
    if (isLoading) {
      return <Loading />;
    }
    if (!question) {
      return <h1>Question doesn't exist!</h1>;
    }
    return (
      <main className="QuestionsShowPage">
        <QuestionDetails {...question} />
        <h2 style={{ marginTop: '3em' }}>Answers</h2>
        <AnswerList answers={question.answers} />
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
