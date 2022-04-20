const Joi = require("joi");

module.exports = {
  addPostValidation: (req, res, next) => {
    const { name, email, phone, favorite, age } = req.body;
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
      favorite: Joi.boolean(),
      age: Joi.number(),
    });
    const validationResult = schema.validate({
      name: name,
      email: email,
      phone: phone,
      favorite: favorite,
      age: age,
    });
    if (validationResult.error) {
      return res.status(400).json({
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
      age: Joi.number(),
    });
    const validationResult = schema.validate(body);
    if (validationResult.error) {
      return res.status(400).json({
        status: "Bad Request",
        code: 400,
        message: `missing field`,
      });
    }
    next();
  },
  patchValidation: (req, res, next) => {
    const { favorite } = req.body;
    const schema = Joi.object({
      favorite: Joi.boolean().required(),
    });
    const validationResult = schema.validate({
      favorite: favorite,
    });
    if (validationResult.error) {
      return res.status(400).json({
        status: "Bad Request",
        code: 400,
        message: `missing required ${validationResult.error.details[0].context.label} field`,
      });
    }
    next();
  },
  userValidation: (req, res, next) => {
    const { email, password } = req.body;
    const schema = Joi.object({
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net", "co"] },
        })
        .required(),
      password: Joi.string().min(6).required(),
    });
    const validationResult = schema.validate({
      email: email,
      password: password,
    });
    if (validationResult.error) {
      return res.status(400).json({
        status: "Bad Request",
        code: 400,
        message: `missing required ${validationResult.error.details[0].context.label} field`,
      });
    }
    next();
  },
  subscriptionValidation: (req, res, next) => {
    const { subscription } = req.body;
    const schema = Joi.object({
      subscription: Joi.string().required(),
    });
    const validationResult = schema.validate({
      subscription: subscription,
    });
    if (validationResult.error) {
      return res.status(400).json({
        status: "Bad Request",
        code: 400,
        message: `missing required ${validationResult.error.details[0].context.label} field`,
      });
    }
    next();
  },
};
