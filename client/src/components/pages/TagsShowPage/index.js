import React, { Component } from 'react';
import { Tag } from '../../../requests/tag';
import { Link } from 'react-router-dom';
import Loading from '../../common/Loading';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { withRouterPropTypes } from '../../../PropTypes/withRouterPropTypes';

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
    return (
      <main className="TagsShowPage">
        {isLoading ? (
          <Loading />
        ) : (
          <ul>
            {tag.questions.map((question) => (
              <li key={question.id}>
                <Link to={`/questions/${question.id}`}>{question.title}</Link>
              </li>
            ))}
          </ul>
        )}
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
