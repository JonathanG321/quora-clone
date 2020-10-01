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

class SpacesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      userSpaces: null,
      spaces: null,
      topics: null,
    };
  }
  async componentDidMount() {
    const spaces = await Space.getSpaces();
    const topics = await Topic.getTopics();
    const userSpaces = await Space.getUserSpaces();
    this.setState({ spaces, isLoading: false, userSpaces, topics });
  }
  render() {
    const { isLoading, userSpaces, spaces, topics } = this.state;
    if (isLoading) {
      return <Loading />;
    }
    return (
      <main className="SpacesPage">
        <div className="card m-5">
          <div className="card-body">
            <h5 className="mb-2">
              <strong>Your Spaces</strong>
            </h5>
            <div>
              {!!userSpaces.length && (
                <ul>
                  {userSpaces.map((space) => {
                    return (
                      <li key={space.id} className="border-bottom space-tab mt-2">
                        <Link
                          className="question-link d-flex align-items-center mb-2"
                          to={`/space/${space.id}`}
                        >
                          <img className="my-space-image mr-2" src={space.image} />
                          <strong>{space.name}</strong>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
              {!userSpaces.length && <h1>No Spaces Yet</h1>}
            </div>
          </div>
        </div>
        <div className="mr-5 ml-5">
          <h3 className="mb-3">Discover Spaces</h3>
          <h5 className="mb-3">Spaces you might like</h5>
          <SpaceCardsDisplay spaces={spaces} />
          {topics.map((topic) => {
            return (
              <div className="mt-3" key={topic.id}>
                <strong>{topic.name}</strong>
                <SpaceCardsDisplay spaces={topic.spaces} />
              </div>
            );
          })}
        </div>
      </main>
    );
  }
}

SpacesPage.propTypes = {
  ...withRouterPropTypes(),
};

export default withRouter(SpacesPage);
