import React, { Component } from 'react';
import Loading from '../../common/Loading';
import { withRouter } from 'react-router-dom';
import { withRouterPropTypes } from '../../../PropTypes/withRouterPropTypes';
import { User } from '../../../requests/user';
import FollowsDisplay from '../../common/FollowsDisplay';
import QuestionCard from '../../common/QuestionCard';
import { Topic } from '../../../requests/topic';
import { Question } from '../../../requests/question';
import './styles.scss';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      user: null,
      questions: [],
      topic: {},
    };
  }
  async setCurrentUser() {
    await User.getCurrentUser().then(async (user) => {
      if (!user.id) {
        this.setState({ isLoading: false });
      } else {
        this.setState({ user, isLoading: false });
        this.getFeed();
        this.getQuestions();
      }
    });
  }
  async getQuestions() {
    const { id } = this.props.match.params;
    const questions = await Question.getTopicQuestions(id);
    this.setState({ questions });
  }
  async getFeed() {
    const { id } = this.props.match.params;
    const topic = await Topic.getTopic(id);
    this.setState({ topic });
  }
  componentDidMount() {
    this.setCurrentUser();
  }
  render() {
    const { isLoading, topic, questions } = this.state;
    if (isLoading) {
      return <Loading />;
    }
    return (
      <main className="d-flex home-page">
        <div className="topics col d-none d-md-block col-3">
          <FollowsDisplay />
        </div>
        <div className="feed col col-md-9">
          <h1 className="d-flex justify-content-center">{topic.name}</h1>
          <div>
            {questions
              .filter((question) => question.answers && question.answers.length)
              .map((question) => (
                <QuestionCard key={question.id} question={question} />
              ))}
          </div>
        </div>
      </main>
    );
  }
}

HomePage.propTypes = {
  ...withRouterPropTypes(),
};

export default withRouter(HomePage);
