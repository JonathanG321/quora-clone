import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Space } from '../../../../requests/space';
import Loading from '../../../common/Loading';
import FollowButton from '../../../common/FollowButton';
import './styles.scss';

class SpaceBillboard extends Component {
  constructor(props) {
    super(props);
    const { space } = props;
    this.state = {
      space,
      follows: null,
      userFollowed: false,
      isLoading: true,
    };
    this.follow = this.follow.bind(this);
    this.unFollow = this.unFollow.bind(this);
  }
  async componentDidMount() {
    const { space } = this.state;
    const follows = await Space.getFollows(space.id);
    this.setUserFollow();
    this.setState({ isLoading: false, follows });
  }
  async setFollows() {
    const { space } = this.state;
    const follows = await Space.getFollows(space.id);
    this.setUserFollow();
    this.setState({ follows: follows });
  }
  async follow() {
    const { space } = this.state;
    await Space.follow(space.id);
    this.setFollows();
    this.setUserFollow();
    this.setState({ userFollowed: true });
  }
  async unFollow() {
    const { space } = this.state;
    await Space.unFollow(space.id);
    this.setFollows();
    this.setUserFollow();
    this.setState({ userFollowed: false });
  }
  async setUserFollow() {
    const { space } = this.state;
    const userFollowed = await Space.getFollow(space.id);
    if (userFollowed) {
      this.setState({ userFollowed: userFollowed.isFollowed });
    }
  }
  render() {
    const { space, follows, userFollowed, isLoading } = this.state;
    if (isLoading) {
      return <Loading />;
    }
    return (
      <div className="card">
        <div
          style={{ backgroundImage: `url(${space.banner})` }}
          className="card-header billboard-banner"
        ></div>
        <div className="mb-3">
          <div className="billboard-image-container">
            <img className="billboard-image" src={space.image} />
          </div>
          <div className="billboard-body">
            <h4>
              <strong>{space.name}</strong>
            </h4>
            <div className="mb-2">{space.tagline}</div>
            <FollowButton
              onFollow={this.follow}
              onUnFollow={this.unFollow}
              isFollowed={userFollowed}
              follows={follows}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default SpaceBillboard;
