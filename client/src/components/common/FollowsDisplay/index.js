import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Feed } from '../../../requests/feed';
import Loading from '../Loading';

class FollowsDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      follows: [],
    };
  }
  async componentDidMount() {
    const follows = (await Feed.getFollows()).map((follow) => {
      follow.topicId ? (follow.type = 'space') : (follow.type = 'topic');
      return follow;
    });
    this.setState({ follows });
  }
  render() {
    const { follows } = this.state;
    if (follows.length === 0) {
      return <Loading />;
    }
    return (
      <ul>
        <li className="max-width">
          <Link className="mt-1 mb-1 follow-list-item" to={`/`}>
            Feed
          </Link>
        </li>
        {follows.map((follow, id) => {
          return (
            <li key={id} className="max-width">
              <Link className="mt-1 mb-1 follow-list-item" to={`/${follow.type}/${follow.id}`}>
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
  follows: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.oneOf(['spaces', 'topics']),
    }),
  ),
};

export default FollowsDisplay;
