const contactMethod = require("../models/contacts");

const addGetContact = async (req, res, next) => {
  const listContact = await contactMethod.listContacts();

  res.status(200).json({
    status: "OK",
    code: 200,
    message: "All contacts",
    data: listContact,
  });
};
const addGetContactById = async (req, res, next) => {
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
};
const addPostContact = async (req, res, next) => {
  const { name, email, phone } = req.body;
  const addContact = await contactMethod.addContact(name, email, phone);
  res.status(201).json({
    status: "Created",
    code: 201,
    message: `Contact ${name} is created`,
    data: addContact,
  });
};
const addDeleteContact = async (req, res, next) => {
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
};
const addUpdateContact = async (req, res, next) => {
  const body = req.body;
  const id = req.params.contactId;
  const updateContact = await contactMethod.updateContact(id, body);
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
};

module.exports = {
  addGetContact,
  addGetContactById,
  addPostContact,
  addDeleteContact,
  addUpdateContact,
};
