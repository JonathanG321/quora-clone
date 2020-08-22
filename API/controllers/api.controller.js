class RecordNotFoundError extends Error {
  constructor(Model, id, msg) {
    const message = msg || `Cannot find ${Model.name} with id: ${id}`;
    super(message);
    this.type = 'RecordNotFoundError';
  }
}

const ApiController = {
  notFound(req, res) {
    const NotFoundErrorJSON = {
      status: 404,
      errors: [
        {
          type: 'NotFound',
          message: `No route matches ${req.originalUrl}`,
        },
      ],
    };
    res.status(404).json(NotFoundErrorJSON);
  },
  recordNotFound(err, req, res) {
    const RecordNotFoundErrorJSON = {
      status: 404,
      errors: [
        {
          type: err.type,
          message: err.message,
        },
      ],
    };
    res.status(404).json(RecordNotFoundErrorJSON);
  },
  serverError(err, req, res) {
    const ServerErrorJSON = {
      status: 500,
      errors: [
        {
          type: err.name,
          message: err.message,
        },
      ],
    };
    res.status(500).json(ServerErrorJSON);
  },
  validationError(err, req, res) {
    res
      .status(422)
      .json({
        type: 'ValidationError',
        errors: err.errors.map((error) => ({ ...error, field: error.path })),
      });
  },
};

module.exports = {
  RecordNotFoundError,
  ApiController,
};
