const express = require("express");
const Joi = require("joi");
const contactMethod = require("../../models/contacts");
const router = express.Router();

router.get("/", async (req, res, next) => {
  const listContact = await contactMethod.listContacts();

  res.status(200).json({
    status: "OK",
    code: 200,
    message: "All contacts",
    data: listContact,
  });
});

router.get("/:contactId", async (req, res, next) => {
  const id = req.params.contactId;
  const getContactById = await contactMethod.getContactById(id);
  if (getContactById) {
    res.status(200).json({
      status: "OK",
      code: 200,
      message: `Contacts ${id} find`,
      data: getContactById,
    });
  } else {
    res.status(404).json({
      status: "Not found",
      code: 404,
      message: `Contacts ${id} Not found`,
    });
  }
});

router.post("/", async (req, res, next) => {
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
  } else {
    const value = validationResult.value;
    const addContact = await contactMethod.addContact(
      value.name,
      value.email,
      value.phone
    );

    res.status(201).json({
      status: "Created",
      code: 201,
      message: `Contact ${name} is created`,
      data: addContact,
    });
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const id = req.params.contactId;
  const updateContact = await contactMethod.removeContact(id);
  if (updateContact) {
    res.status(200).json({
      status: "OK",
      code: 200,
      message: `Contact ${id} is delete`,
      data: updateContact,
    });
  } else {
    res.status(404).json({
      status: "Not Found",
      code: 404,
      message: `Not Found`,
    });
  }
});

router.put("/:contactId", async (req, res, next) => {
  const body = req.body;
  const id = req.params.contactId;
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
  } else {
    const value = validationResult.value;
    const updateContact = await contactMethod.updateContact(id, value);
    if (updateContact) {
      res.status(200).json({
        status: "OK",
        code: 200,
        message: `Contact is update`,
        data: updateContact,
      });
    } else {
      res.status(404).json({
        status: "Not Found",
        code: 404,
        message: `Not Found`,
      });
    }
  }
});

module.exports = router;
