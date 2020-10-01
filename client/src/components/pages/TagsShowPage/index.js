import React, { Component } from 'react';
import { Tag } from '../../../requests/tag';
import { Link } from 'react-router-dom';
import Loading from '../../common/Loading';
import Fa from '../../common/Fa';
import QuestionTab from '../../common/QuestionTab';
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
            <QuestionTab key={question.id} showBody={true} {...question} />
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
