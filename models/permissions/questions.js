function can(user, action, question) {
  if (!user) {
    return false;
  }
  switch (action) {
    case 'edit':
      return canEdit(user, question);
    case 'delete':
      return canDelete(user, question);
    case 'dislike':
      return canDislike(user, question);
    case 'manage':
      return canManage(user, question);
    default:
      return false;
  }
}

function canEdit(user, question) {
  return user.id === question.user.id;
}

function canDelete(user, question) {
  return user.id === question.user.id;
}

function canDislike(user, question) {
  return user.id !== question.user.id;
}

function cannot(user, action, question) {
  return !can(user, action, question);
}

function canManage(user, question) {
  return canEdit(user, question) && canDelete(user, question);
}

module.exports = { can, cannot };
