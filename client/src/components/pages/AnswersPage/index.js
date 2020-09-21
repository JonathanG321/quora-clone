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
        <div className="topics col d-none d-md-block col-3">
          <h3>Questions</h3>
          <hr />
          <ul>
            <li className="max-width">
              <Link className="mt-1 mb-1 follow-list-item" to={`/`}>
                Questions for you
              </Link>
            </li>
            <li className="max-width">
              <Link className="mt-1 mb-1 follow-list-item" to={`/`}>
                Answer requests
              </Link>
            </li>
            <li className="max-width">
              <Link className="mt-1 mb-1 follow-list-item" to={`/`}>
                Answer drafts
              </Link>
            </li>
          </ul>
        </div>
        <div className="feed col col-md-9">
          <div>
            <QuestionsCard />
          </div>
        </div>
      </main>
    );
  }
}

Answers.propTypes = {
  ...withRouterPropTypes(),
};

export default withRouter(Answers);