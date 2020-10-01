import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from '../Loading';
import FollowButton from '../FollowButton';
import { Link } from 'react-router-dom';
import { Space } from '../../../requests/space';
import { Topic } from '../../../requests/topic';
import './styles.scss';

class SpaceCard extends Component {
  constructor(props) {
    super(props);
    const { space, isTopic = false } = props;
    this.state = {
      isLoading: true,
      isTopic,
      space,
      follows: null,
      userFollowed: false,
    };
    this.follow = this.follow.bind(this);
    this.unFollow = this.unFollow.bind(this);
  }
  async componentDidMount() {
    const { space, isTopic } = this.state;
    const follows = isTopic ? await Topic.getFollows(space.id) : await Space.getFollows(space.id);
    this.setUserFollow();
    this.setState({ isLoading: false, follows });
  }
  async setFollows() {
    const { space, isTopic } = this.state;
    const follows = isTopic ? await Topic.getFollows(space.id) : await Space.getFollows(space.id);
    this.setUserFollow();
    this.setState({ follows: follows });
  }
  async follow() {
    const { space, isTopic } = this.state;
    isTopic ? await Topic.follow(space.id) : await Space.follow(space.id);
    this.setFollows();
    this.setUserFollow();
    this.setState({ userFollowed: true });
  }
  async unFollow() {
    const { space, isTopic } = this.state;
    isTopic ? await Topic.unFollow(space.id) : await Space.unFollow(space.id);
    this.setFollows();
    this.setUserFollow();
    this.setState({ userFollowed: false });
  }
  async setUserFollow() {
    const { space, isTopic } = this.state;
    const userFollowed = isTopic
      ? await Topic.getFollow(space.id)
      : await Space.getFollow(space.id);
    if (userFollowed) {
      this.setState({ userFollowed: userFollowed.isFollowed });
    }
  }
  render() {
    const { isLoading, space, follows, userFollowed, isTopic } = this.state;
    if (isLoading) {
      return <Loading />;
    }
    return (
      <div className="card space-card no-shrink m-3">
        <div
          style={{ backgroundImage: `url(${space.banner})` }}
          className="card-header space-card-header"
        ></div>
        <div className="card-body space-card-body d-flex flex-column justify-content-between">
          <div className="d-flex justify-content-center">
            <img className="space-card-image" src={space.image} />
          </div>
          <div className="space-card-tagline d-flex flex-column text-align-center">
            {isTopic && (
              <Link className="question-link" to={`/topic/${space.id}`}>
                <strong>{space.name}</strong>
              </Link>
            )}
            {!isTopic && (
              <Link className="question-link" to={`/space/${space.id}`}>
                <strong>{space.name}</strong>
              </Link>
            )}
            <div className="space-card-text">{!!space.tagline && <div>{space.tagline}</div>}</div>
          </div>
          <div className="d-flex justify-content-center">
            <FollowButton
              onFollow={this.follow}
              onUnFollow={this.unFollow}
              isFollowed={userFollowed}
              follows={follows}
              spaceId={space.id}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default SpaceCard;
