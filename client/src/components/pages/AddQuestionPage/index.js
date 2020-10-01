import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouterPropTypes } from '../../../PropTypes/withRouterPropTypes';
import { withRouter } from 'react-router-dom';
import Loading from '../../common/Loading';
import { Question } from '../../../requests/question';
import { Space } from '../../../requests/space';
import { Tag } from '../../../requests/tag';

class AddQuestionPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      spaces: [],
      tags: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  async componentDidMount() {
    const spaces = await Space.getUserSpaces();
    const tags = await Tag.all();
    this.setState({ isLoading: false, spaces, tags });
  }
  async handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newQuestion = {
      title: formData.get('title'),
      body: formData.get('body'),
      spaceId: parseInt(formData.get('space')),
      tags: formData.getAll('tags'),
    };
    const question = await Question.create(newQuestion);
    if (question) {
      this.props.history.push(`/questions/${question.id}`);
    } else {
      alert('Create Question Failed');
    }
  }
  render() {
    const { isLoading, spaces, tags } = this.state;
    if (isLoading) {
      return <Loading />;
    }
    return (
      <div className="ml-3 mr-3 mt-3">
        <h1>Add Question</h1>
        {!!spaces.length && (
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input className="form-control" type="title" name="title" />
            </div>
            <div className="form-group">
              <label htmlFor="body">Body</label>
              <textarea className="form-control" type="body" name="body" />
            </div>
            <div className="form-group">
              <label htmlFor="space">Space</label>
              <select defaultValue="" name="space" className="form-control">
                <option value="" disabled>
                  Select a Space
                </option>
                {spaces.map((space) => {
                  return (
                    <option key={space.id} value={space.id}>
                      {space.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="tags">Tags</label>
              <select name="tags" className="form-control" multiple>
                {tags.map((tag) => {
                  return (
                    <option key={tag.id} value={tag.id}>
                      {tag.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <input className="btn btn-outline-primary" type="submit" value="Add Question" />
          </form>
        )}
        {!spaces.length && <h2>Join some spaces before making a question!</h2>}
      </div>
    );
  }
}

AddQuestionPage.propTypes = {
  ...withRouterPropTypes(),
};

export default withRouter(AddQuestionPage);
