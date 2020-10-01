import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from '../Loading';
import SpaceCard from '../SpaceCard';
import { Space } from '../../../requests/space';
import './styles.scss';

class RelatedSpacesDisplay extends Component {
  constructor(props) {
    super(props);
    const { topic } = props;
    this.state = {
      topic,
      spaces: [],
      isLoading: true,
    };
  }
  async componentDidMount() {
    const { topic } = this.state;
    const spaces = await Space.getTopicSpaces(topic.id);
    this.setState({ isLoading: false, spaces });
  }
  render() {
    const { spaces, isLoading, topic } = this.state;
    if (isLoading) {
      return <Loading />;
    }
    return (
      <div className="mt-2 mb-2 card">
        <strong className="mt-3 ml-4">Spaces related to {topic.name}</strong>
        <div className="overflow d-flex mr-3">
          {spaces.map((space) => {
            return <SpaceCard key={space.id} space={space} />;
          })}
        </div>
      </div>
    );
  }
}

export default RelatedSpacesDisplay;
