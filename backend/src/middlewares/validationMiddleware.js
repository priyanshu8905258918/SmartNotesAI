import ApiError from '../utils/apiError.js';

const validate = (schema) => {
  return (req, res, next) => {
    try {
      if (schema.body) {
        req.body = schema.body.parse(req.body);
      }
      if (schema.query) {
        req.query = schema.query.parse(req.query);
      }
      if (schema.params) {
        req.params = schema.params.parse(req.params);
      }
      next();
    } catch (error) {
      const errors = error.errors ? error.errors.map(err => ({
        field: err.path.join('.'),
        message: err.message,
      })) : [];
      next(new ApiError(400, 'Validation Error', errors));
    }
  };
};

export default validate;
