import React, { Component } from 'react';
import Loading from '../../common/Loading';
import { withRouter } from 'react-router-dom';
import { withRouterPropTypes } from '../../../PropTypes/withRouterPropTypes';
import { User } from '../../../requests/user';
import FollowsDisplay from '../../common/FollowsDisplay';
import AnswerCard from '../../common/AnswerCard';
import RelatedSpacesDisplay from '../../common/RelatedSpacesDisplay';
import { Topic } from '../../../requests/topic';
import { Question } from '../../../requests/question';
import './styles.scss';
import FollowButton from '../../common/FollowButton';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      questions: [],
      topic: null,
      follows: [],
      userFollowed: false,
    };
    this.follow = this.follow.bind(this);
    this.unFollow = this.unFollow.bind(this);
  }
  async setup() {
    await this.getTopic();
    await this.setFollows();
    await this.setUserFollow();
    await this.getQuestions();
    await this.setState({ isLoading: false });
  }
  async setFollows() {
    const { topic } = this.state;
    const follows = await Topic.getFollows(topic.id);
    this.setUserFollow();
    this.setState({ follows: follows });
  }
  async follow() {
    const { topic } = this.state;
    await Topic.follow(topic.id);
    this.setFollows();
    this.setUserFollow();
    this.setState({ userFollowed: true });
  }
  async unFollow() {
    const { topic } = this.state;
    await Topic.unFollow(topic.id);
    this.setFollows();
    this.setUserFollow();
    this.setState({ userFollowed: false });
  }
  async setUserFollow() {
    const { topic } = this.state;
    const userFollowed = await Topic.getFollow(topic.id);
    if (userFollowed) {
      this.setState({ userFollowed: userFollowed.isFollowed });
    }
  }
  async getQuestions() {
    const { id } = this.props.match.params;
    const questions = await Question.getTopicQuestions(id);
    this.setState({ questions });
  }
  async getTopic() {
    const { id } = this.props.match.params;
    const topic = await Topic.getTopic(id);
    this.setState({ topic });
  }
  componentDidMount() {
    this.setup();
  }
  componentDidUpdate(oldProps, oldState) {
    if (oldProps.match.params.id !== this.props.match.params.id) {
      this.setup();
    }
  }
  render() {
    const { isLoading, topic, questions, userFollowed, follows } = this.state;
    if (isLoading || topic === null) {
      return <Loading />;
    }
    return (
      <main className="d-flex home-page">
        <div className="topics col d-none d-md-block col-3">
          <FollowsDisplay />
        </div>
        <div className="feed col col-md-9">
          <div className="card mb-2">
            <div className="card-body d-flex pb-3 mb-1 align-items-center">
              <img className="topic-banner-image mr-3" src={topic.image} />
              <div className="d-flex flex-column justify-content-center">
                <span>
                  <h1 className="d-flex mb-0">{topic.name}</h1>
                </span>
                <FollowButton
                  onFollow={this.follow}
                  onUnFollow={this.unFollow}
                  isFollowed={userFollowed}
                  follows={follows}
                />
              </div>
            </div>
          </div>
          <RelatedSpacesDisplay topic={topic} />
          <div>
            {questions
              .filter((question) => question.answers && question.answers.length)
              .map((question) => (
                <AnswerCard key={question.id} question={question} />
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
