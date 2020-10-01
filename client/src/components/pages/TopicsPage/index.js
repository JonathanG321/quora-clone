import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../../common/Loading';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { withRouterPropTypes } from '../../../PropTypes/withRouterPropTypes';
import { Space } from '../../../requests/space';
import { Topic } from '../../../requests/topic';
import SpaceCardsDisplay from '../../common/SpaceCardsDisplay';
import './styles.scss';

class TopicsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      userTopics: null,
      topics: null,
    };
  }
  async componentDidMount() {
    const topics = await Topic.getAllTopics();
    const userTopics = await Topic.getUserTopics();
    this.setState({ topics, isLoading: false, userTopics });
  }
  render() {
    const { isLoading, userTopics, topics } = this.state;
    if (isLoading) {
      return <Loading />;
    }
    return (
      <main className="TopicsPage">
        <div className="card m-5">
          <div className="card-body">
            <h5 className="mb-2">
              <strong>Your Topics</strong>
            </h5>
            <div>
              {!!userTopics.length && (
                <ul>
                  {userTopics.map((topic) => {
                    return (
                      <li key={topic.id} className="border-bottom space-tab mt-2">
                        <Link
                          className="question-link d-flex align-items-center mb-2"
                          to={`/topic/${topic.id}`}
                        >
                          <img className="my-topic-image mr-2" src={topic.image} />
                          <strong>{topic.name}</strong>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
              {!userTopics.length && <h1>No Topics Yet</h1>}
            </div>
          </div>
        </div>
        <div className="mr-5 ml-5">
          <h3 className="mb-3">Discover Topics</h3>
          <h5 className="mb-3">Topics you might like</h5>
          <SpaceCardsDisplay isTopic={true} spaces={topics} />
        </div>
      </main>
    );
  }
}

TopicsPage.propTypes = {
  ...withRouterPropTypes(),
};

export default withRouter(TopicsPage);
