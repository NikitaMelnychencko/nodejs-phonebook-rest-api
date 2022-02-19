const Joi = require("joi");

module.exports = {
  addPostValidation: (req, res, next) => {
    const { name, email, phone } = req.body;
    const schema = Joi.object({
      name: Joi.string().alphanum().min(3).max(30).required(),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net"] },
        })
        .required(),
      phone: Joi.string()
        .length(10)
        .pattern(/^[0-9]+$/)
        .required(),
    });
    const validationResult = schema.validate({
      name: name,
      email: email,
      phone: phone,
    });
    if (validationResult.error) {
      res.status(400).json({
        status: "Bad Request",
        code: 400,
        message: `missing required ${validationResult.error.details[0].context.label} field`,
      });
    }
    next();
  },
  addPutValidation: (req, res, next) => {
    const body = req.body;
    const schema = Joi.object({
      name: Joi.string().alphanum().min(3).max(30).optional(),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net"] },
        })
        .optional(),
      phone: Joi.string()
        .length(10)
        .pattern(/^[0-9]+$/)
        .optional(),
    });
    const validationResult = schema.validate(body);
    if (validationResult.error) {
      res.status(400).json({
        status: "Bad Request",
        code: 400,
        message: `missing field`,
      });
    }
    next();
  },
};
