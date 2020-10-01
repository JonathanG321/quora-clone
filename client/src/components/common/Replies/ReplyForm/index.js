import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './styles.scss';

function ReplyForm(props) {
  const { onSubmit } = props;
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newReply = {
      body: formData.get('body'),
    };
    event.currentTarget.reset();
    onSubmit(newReply);
  }
  return (
    <div className="reply-form tall card-header">
      <form className="d-flex align-items-center" onSubmit={handleSubmit}>
        <div className="col-9 d-flex align-items-center pl-0 pr-0">
          <input className="form-control" type="text" name="body" placeholder="Add a reply..." />
        </div>
        <div className="col-3 pr-0 d-flex align-items-center">
          <input type="submit" className="btn btn-primary shift" value="Add Reply" />
        </div>
      </form>
    </div>
  );
}

ReplyForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default ReplyForm;
