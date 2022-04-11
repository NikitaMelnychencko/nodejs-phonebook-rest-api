const contactService = require("../../service/contacts");

const addGetContact = async (req, res, next) => {
  const listContact = await contactService.getAll();

  res.status(200).json({
    status: "OK",
    code: 200,
    message: "All contacts",
    data: listContact,
  });
};

const addGetContactById = async (req, res, next) => {
  const id = req.params.contactId;
  const getContact = await contactService.getById(id);
  return res.status(200).json({
    status: "OK",
    code: 200,
    message: `Contacts ${id} find`,
    data: getContact,
  });
};
module.exports = {
  addGetContact,
  addGetContactById,
};
