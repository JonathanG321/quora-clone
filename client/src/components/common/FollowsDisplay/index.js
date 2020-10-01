import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { withRouterPropTypes } from '../../../PropTypes/withRouterPropTypes';
import { Feed } from '../../../requests/feed';
import Loading from '../Loading';
import Fa from '../Fa';
import './styles.scss';

class FollowsDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      follows: [],
      isLoading: true,
    };
  }
  async componentDidMount() {
    const follows = (await Feed.getFollows()).map((follow) => {
      follow.type = !!follow.topicId ? 'space' : 'topic';
      return follow;
    });
    this.setState({ isLoading: false, follows });
  }
  render() {
    const { follows, isLoading } = this.state;
    if (isLoading) {
      return <Loading />;
    }
    if (follows.length === 0) {
      this.props.history.push('/spaces');
      return <div />;
    }
    return (
      <ul>
        <li className="max-width">
          <Link className="mt-1 mb-1 d-flex align-items-center follow-list-item" to={`/`}>
            <div className="shift-right">
              {' '}
              <Fa kind="bars" />
            </div>
            <div className="ml-2">Feed</div>
          </Link>
        </li>
        {follows.map((follow, id) => {
          return (
            <li key={id} className="max-width">
              <Link
                className="mt-1 mb-1 follow-list-item d-flex align-items-center"
                to={`/${follow.type}/${follow.id}`}
              >
                <img className={`${follow.type}-image mr-2`} src={follow.image} />
                {follow.name}
              </Link>
            </li>
          );
        })}
      </ul>
    );
  }
}

FollowsDisplay.propTypes = {
  ...withRouterPropTypes(),
};

export default withRouter(FollowsDisplay);
