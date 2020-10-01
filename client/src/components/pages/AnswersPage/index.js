import React, { Component } from 'react';
import Loading from '../../common/Loading';
import { withRouter } from 'react-router-dom';
import { withRouterPropTypes } from '../../../PropTypes/withRouterPropTypes';
import { User } from '../../../requests/user';
import QuestionsCard from '../../common/QuestionsCard';
import { Question } from '../../../requests/question';
import { Link } from 'react-router-dom';
import './styles.scss';

class Answers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }
  componentDidMount() {
    this.setState({ isLoading: false });
  }
  render() {
    const { isLoading } = this.state;
    if (isLoading) {
      return <Loading />;
    }
    return (
      <main className="d-flex home-page">
        <div className="feed m-3 max-width">
          <QuestionsCard />
        </div>
      </main>
    );
  }
}

Answers.propTypes = {
  ...withRouterPropTypes(),
};

export default withRouter(Answers);
