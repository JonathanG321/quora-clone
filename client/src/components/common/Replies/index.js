import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReplyForm from './ReplyForm';
import { Link } from 'react-router-dom';
import { Reply } from '../../../requests/reply';
import './styles.scss';
import LoadMoreRepliesButton from './LoadMoreRepliesButton';

class Replies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      replies: [],
      limit: 3,
      offset: 0,
    };
    this.onSubmitReplyForm = this.onSubmitReplyForm.bind(this);
    this.onClickLoadReplies = this.onClickLoadReplies.bind(this);
  }
  componentDidMount() {
    this.onClickLoadReplies();
  }
  async onSubmitReplyForm(newReply) {
    const { answerId } = this.props;
    const reply = await Reply.create(newReply, answerId);
    this.addReplyToState(reply, answerId);
  }
  async onClickLoadReplies() {
    const { limit, offset } = this.state;
    const { answerId } = this.props;
    const replies = await Reply.get(answerId, limit, offset);
    this.addRepliesToState(replies, answerId, limit);
  }
  addRepliesToState(replies) {
    const { limit } = this.state;
    this.setState((state) => ({
      replies: state.replies.concat(replies),
      offset: state.offset + limit,
    }));
  }
  addReplyToState(reply) {
    this.setState((state) => ({
      replies: [reply].concat(state.replies),
      offset: state.offset + 1,
    }));
  }
  render() {
    const { replies = [] } = this.state;
    console.log(replies);
    return (
      <div>
        <ReplyForm onSubmit={this.onSubmitReplyForm} />
        {replies.map((reply, index) => {
          return (
            <div key={index} className="reply-card card-body pb-3">
              {reply.user.firstName} {reply.user.lastName}
              <span className="date">
                {' '}
                •{' '}
                {new Date(reply.createdAt).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
              <div>{reply.body}</div>
            </div>
          );
        })}
        <LoadMoreRepliesButton onClick={this.onClickLoadReplies} />
      </div>
    );
  }
}

Replies.propTypes = {
  answerId: PropTypes.number.isRequired,
};

export default Replies;
