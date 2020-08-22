function can(user, action, reply) {
  if (!user) {
    return false;
  }
  switch (action) {
    case 'edit':
      return canEdit(user, reply);
    case 'delete':
      return canDelete(user, reply);
    case 'manage':
      return canManage(user, reply);
    default:
      return false;
  }
}

function canEdit(user, reply) {
  return user.id === reply.user.id;
}

function canDelete(user, reply) {
  return user.id === reply.user.id;
}

function cannot(user, action, reply) {
  return !can(user, action, reply);
}

function canManage(user, reply) {
  return canEdit(user, reply) && canDelete(user, reply);
}

module.exports = { can, cannot };
