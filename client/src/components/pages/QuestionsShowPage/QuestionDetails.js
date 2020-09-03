import React from 'react';
import PropTypes from 'prop-types';
import Fa from '../../common/Fa';

function QuestionDetails(props) {
  const { title, body, tags, createdAt, user } = props;
  return (
    <div className="QuestionDetails">
      {tags.map((tag) => (
        <a href={`/tags/${tag.id}`} key={tag.id} className="tag mr-2">
          {tag.name}
        </a>
      ))}
      <h3>
        <strong>{title}</strong>
      </h3>
      <p>{body}</p>
      <p>Created at: {new Date(createdAt).toLocaleDateString()}</p>
      <div className="d-flex">
        <div className="answer-button">
          <Fa type="r" size="lg" kind="edit" color="blue" />
          {' Answer'}
        </div>
        <div className="dislike-button d-flex justify-content-center align-items-center">
          <Fa type="r" size="lg" kind="thumbs-down" />
        </div>
      </div>
      <hr />
    </div>
  );
}

QuestionDetails.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ),
  user: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
  }).isRequired,
};

export default QuestionDetails;
