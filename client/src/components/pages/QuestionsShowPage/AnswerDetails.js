import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Fa from '../../common/Fa';
import Replies from '../../common/Replies';
import { Answer } from '../../../requests/answer';
import { Vote } from '../../../requests/vote';

class AnswerDetails extends Component {
  constructor(props) {
    super(props);
    const { user, createdAt, body, id } = props;
    this.state = {
      user,
      createdAt,
      id,
      body,
      showReplies: false,
      votes: [],
      vote: null,
      isLoading: true,
    };
    this.toggleReplies = this.toggleReplies.bind(this);
    this.vote = this.vote.bind(this);
    this.unVote = this.unVote.bind(this);
  }
  async componentDidMount() {
    const { id } = this.state;
    const answer = await Answer.one(id);
    this.setVote();
    this.setState({ isLoading: false, votes: answer.votes });
  }
  async setVote() {
    const { id } = this.state;
    const vote = await Vote.getVote(id);
    if (!!vote) {
      this.setState({ vote });
    }
  }
  async vote(isUpVote) {
    const { id } = this.state;
    const vote = await Vote.vote(isUpVote, id);
    const newAnswer = await Answer.one(id);
    this.setState({ vote, votes: newAnswer.votes });
  }
  async unVote() {
    const { id } = this.state;
    const vote = await Vote.unVote(id);
    const answer = await Answer.one(id);
    this.setState({ vote: null, votes: answer.votes });
  }
  toggleReplies() {
    this.setState((state) => ({
      showReplies: !state.showReplies,
    }));
  }
  render() {
    const { user, createdAt, body, showReplies, id, vote, votes } = this.state;
    return (
      <div className="AnswerDetails">
        <p>
          {user.firstName} {user.lastName}
        </p>
        <p>
          {new Date(createdAt).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
        {body && <p>{body}</p>}
        <div className="d-flex">
          <div
            onClick={!!vote && vote.isUpVote ? () => this.unVote(id) : () => this.vote(true, id)}
            className="dislike-button d-flex justify-content-center align-items-center mr-2"
          >
            <Fa
              type="r"
              size="lg"
              kind="arrow-alt-circle-up"
              color={!!vote && vote.isUpVote ? 'blue' : 'black'}
            />
          </div>
          <div
            onClick={!!vote && !vote.isUpVote ? () => this.unVote(id) : () => this.vote(false, id)}
            className="dislike-button d-flex justify-content-center align-items-center"
          >
            <Fa
              type="r"
              size="lg"
              kind="arrow-alt-circle-down"
              color={!!vote && !vote.isUpVote ? 'red' : 'black'}
            />
          </div>
          <div className="ml-1 d-flex align-items-center">{calcVoteCount(votes)}</div>
          <button
            onClick={this.toggleReplies}
            className="collapse-button dislike-button comments-button d-flex align-items-center ml-2 justify-content-center"
            type="button"
          >
            <Fa kind="comment" type="r" />
          </button>
        </div>
        {showReplies && <Replies answerId={id} />}
      </div>
    );
  }
}

function calcVoteCount(votes) {
  return votes.reduce((acc, vote) => (vote.isUpVote ? acc + 1 : acc - 1), 0);
}

AnswerDetails.propTypes = {
  id: PropTypes.number,
  user: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
  createdAt: PropTypes.string.isRequired,
  body: PropTypes.string,
};

AnswerDetails.defaultProps = {
  isRed: false,
  body: '',
};

export default AnswerDetails;
