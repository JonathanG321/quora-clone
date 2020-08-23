const permissions = {};

function allow(Model, action, OtherModel, validator = () => true) {
  if (!permissions[Model.name]) {
    permissions[Model.name] = {};
  }
  if (!permissions[Model.name][OtherModel.name]) {
    permissions[Model.name][OtherModel.name] = {};
  }
  permissions[Model.name][OtherModel.name][action] = validator;
}

function can(model, action, otherModel, ...additionalModels) {
  if (!model || !otherModel || !action) {
    return false;
  }
  if (!permissions[model.constructor.name]) {
    return false;
  }
  if (!permissions[model.constructor.name][otherModel.constructor.name]) {
    return false;
  }
  const validator =
    permissions[model.constructor.name][otherModel.constructor.name][action] ||
    permissions[model.constructor.name][otherModel.constructor.name]['manage'];
  if (!validator || typeof validator !== 'function') {
    return false;
  }
  return validator(model, otherModel, ...additionalModels);
}

module.exports = { can, allow };
