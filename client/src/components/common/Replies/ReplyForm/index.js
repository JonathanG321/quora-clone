import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './styles.scss';

function ReplyForm(props) {
  const { onSubmit, answerId, questionId } = props;
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newReply = {
      body: formData.get('body'),
    };
    event.currentTarget.reset();
    onSubmit(newReply, answerId, questionId);
  }
  return (
    <div className="reply-form card-header">
      <form className="d-flex" onSubmit={handleSubmit}>
        <div className="col-10 d-flex align-items-center pl-0 pr-0">
          <input className="form-control" type="text" name="body" placeholder="Add a reply..." />
        </div>
        <div className="col-2 d-flex align-items-center">
          <input type="submit" className="btn btn-primary" value="Add Reply" />
        </div>
      </form>
    </div>
  );
}

ReplyForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  answerId: PropTypes.number.isRequired,
};

ReplyForm.defaultProps = {
  onSubmit: () => {},
};

export default ReplyForm;
