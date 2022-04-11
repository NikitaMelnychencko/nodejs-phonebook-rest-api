const contactService = require("../../service/contacts");

const addDeleteContact = async (req, res, next) => {
  const id = req.params.contactId;
  const updateContact = await contactService.remove(id);
  
  return res.status(200).json({
    status: "OK",
    code: 200,
    message: `Contact ${id} is delete`,
    data: updateContact,
  });
};

module.exports = {
  addDeleteContact,
};
