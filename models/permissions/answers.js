function can(user, action, answer) {
  if (!user) {
    return false;
  }
  switch (action) {
    case 'edit':
      return canEdit(user, answer);
    case 'delete':
      return canDelete(user, answer);
    case 'vote':
      return canVote(user, answer);
    case 'manage':
      return canManage(user, answer);
    default:
      return false;
  }
}

function canEdit(user, answer) {
  return user.id === answer.user.id;
}

function canDelete(user, answer) {
  return user.id === answer.user.id;
}

function canVote(user, answer) {
  return user.id !== answer.user.id;
}

function cannot(user, action, answer) {
  return !can(user, action, answer);
}

function canManage(user, answer) {
  return canEdit(user, answer) && canDelete(user, answer);
}

module.exports = { can, cannot };
