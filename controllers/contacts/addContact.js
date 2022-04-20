const contactService = require("../../service/contacts");

const addPostContact = async (req, res, next) => {
  const { name, email, phone, age, favorite } = req.body;
  const contact = await contactService.create(name, email,age, phone, favorite, req.user);
  return res.status(201).json({
    status: "Created",
    code: 201,
    message: `Contact ${name} is created`,
    data: contact,
  });
};
module.exports = {
  addPostContact,
};
