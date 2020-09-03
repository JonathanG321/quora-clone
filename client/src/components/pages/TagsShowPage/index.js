import React, { Component } from 'react';
import { Tag } from '../../../requests/tag';
import { Link } from 'react-router-dom';
import Loading from '../../common/Loading';
import Fa from '../../common/Fa';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { withRouterPropTypes } from '../../../PropTypes/withRouterPropTypes';
import './styles.scss';

class TagsShowPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      tag: null,
    };
  }
  componentDidMount() {
    const { id } = this.props.match.params;
    Tag.one(id).then((tag) => {
      this.setState({ tag: tag, isLoading: false });
    });
  }
  render() {
    const { tag, isLoading } = this.state;
    if (isLoading) {
      return <Loading />;
    }
    if (!tag) {
      return <h1>Tag doesn't exist!</h1>;
    }
    return (
      <main className="TagsShowPage">
        <h1>{tag.name}</h1>
        <ul>
          <hr />
          {tag.questions.map((question) => (
            <li key={question.id}>
              <div className="d-flex">
                <Link className="d-flex align-items-center mr-2" to={`/questions/${question.id}`}>
                  <h6 className="mb-0">{question.title}</h6>{' '}
                </Link>
                <span className="d-flex align-items-center mr-1">
                  {new Date(question.createdAt).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
                <span>
                  <div className="answer-button d-flex justify-content-center align-items-center">
                    <Fa type="r" size="lg" kind="thumbs-down" />
                    <span className="ml-1">{question.dislikes.length}</span>
                  </div>
                </span>
              </div>
              <div>{question.body}</div>
              <div className="ml-5">
                <hr />
                <div className="d-flex">
                  <h6 className="d-flex align-items-center mb-0 mr-2">
                    {question.answers[0].user.firstName} {question.answers[0].user.lastName}
                  </h6>
                  <span>
                    {new Date(question.answers[0].createdAt).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </div>
                <div>{question.answers[0].body}</div>
              </div>
              <hr />
            </li>
          ))}
        </ul>
      </main>
    );
  }
}

TagsShowPage.propTypes = {
  ...withRouterPropTypes({
    paramsPropTypes: {
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    },
  }),
};

export default withRouter(TagsShowPage);
