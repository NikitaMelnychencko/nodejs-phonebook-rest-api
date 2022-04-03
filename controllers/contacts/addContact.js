const { addContact } = require("../../models/index");

const addPostContact = async (req, res, next) => {
  const { name, email, phone, favorite } = req.body;
  const contact = await addContact.addContact(name, email, phone, favorite);
  res.status(201).json({
    status: "Created",
    code: 201,
    message: `Contact ${name} is created`,
    data: contact,
  });
};
module.exports = {
  addPostContact,
};
