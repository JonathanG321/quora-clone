import PropTypes from 'prop-types';

export const withRouterPropTypes = (opts = {}) => {
  const { paramsPropTypes = {} } = opts;
  return {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        ...paramsPropTypes,
      }).isRequired,
    }).isRequired,
  };
};
