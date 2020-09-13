import React, { Component } from 'react';
import Loading from '../../common/Loading';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { withRouterPropTypes } from '../../../PropTypes/withRouterPropTypes';
import { User } from '../../../requests/user';
import FollowsDisplay from '../../common/FollowsDisplay';
import QuestionCard from '../../common/QuestionCard';
import './styles.scss';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      user: null,
      follows: [],
      questions: [],
    };
  }
  async setCurrentUser() {
    User.getCurrentUser().then((user) => {
      if (!user.id) {
        this.setState({ isLoading: false });
      } else {
        const follows = getFollows(user);
        const questions = getQuestions(user);
        this.setState({ user, isLoading: false, follows, questions });
      }
    });
  }
  componentDidMount() {
    this.setCurrentUser();
  }
  render() {
    const { user, isLoading, follows, questions } = this.state;
    if (isLoading) {
      return <Loading />;
    }
    return (
      <main className="d-flex home-page">
        <div className="topics col d-none d-md-block col-3">
          <FollowsDisplay follows={follows} />
        </div>
        <div className="feed col col-md-9">
          {questions
            .filter((question) => question.answers && question.answers.length)
            .map((question) => (
              <QuestionCard key={question.id} question={question} />
            ))}
        </div>
      </main>
    );
  }
}

function getFollows(user) {
  return user.topics
    .map((topic) => {
      topic.type = 'topics';
      return topic;
    })
    .concat(
      user.spaces.map((space) => {
        space.type = 'spaces';
        return space;
      }),
    );
}

function getQuestions(user) {
  return user.topics
    .map((topic) => {
      return topic.spaces.map((space) => {
        return space.questions.map((question) => {
          return question;
        });
      });
    })
    .concat(
      user.spaces.map((space) => {
        return space.questions.map((question) => {
          return question;
        });
      }),
    )
    .flat()
    .sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return dateA - dateB;
    });
}

HomePage.propTypes = {
  ...withRouterPropTypes(),
};

export default withRouter(HomePage);
