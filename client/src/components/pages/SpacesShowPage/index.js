import React, { Component } from 'react';
import Loading from '../../common/Loading';
import { withRouter } from 'react-router-dom';
import { withRouterPropTypes } from '../../../PropTypes/withRouterPropTypes';
import SpaceBillboard from './SpaceBillboard';
import { Space } from '../../../requests/space';
import AnswerCard from '../../common/AnswerCard';
import './styles.scss';

class SpacesShowPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      space: {},
    };
  }
  async componentDidMount() {
    this.getSpace();
  }
  async getSpace() {
    const { id } = this.props.match.params;
    const space = await Space.getSpace(id);
    this.setState({ space, isLoading: false });
  }
  render() {
    const { isLoading, space } = this.state;
    if (isLoading) {
      return <Loading />;
    }
    return (
      <main className="d-flex home-page mb-3">
        <div className="feed col col-md-8">
          <div className="mb-2">
            <SpaceBillboard space={space} />
          </div>
          {space.questions.map((question) => {
            return <AnswerCard key={question.id} question={question} />;
          })}
        </div>
        <div className="col d-none d-md-block col-4">
          <div className="card">
            <div className="card-header border-bottom">
              <strong>Details</strong>
            </div>
            <div className="card-body mb-1">{space.description}</div>
          </div>
        </div>
      </main>
    );
  }
}

SpacesShowPage.propTypes = {
  ...withRouterPropTypes(),
};

export default withRouter(SpacesShowPage);
