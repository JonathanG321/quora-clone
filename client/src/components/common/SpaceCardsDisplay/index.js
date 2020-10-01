import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from '../Loading';
import SpaceCard from '../SpaceCard';
import './styles.scss';

class SpaceCardsDisplay extends Component {
  constructor(props) {
    super(props);
    const { spaces, isTopic } = props;
    this.state = {
      spaces,
      isTopic,
    };
  }
  render() {
    const { spaces, isTopic } = this.state;
    return (
      <div className="m-3 d-flex flex-wrap justify-content-around">
        {spaces.map((space) => {
          return <SpaceCard isTopic={isTopic} key={space.id} space={space} />;
        })}
      </div>
    );
  }
}

export default SpaceCardsDisplay;
