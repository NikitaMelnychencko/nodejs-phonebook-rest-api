const { removeContact } = require("../../models/index");

const addDeleteContact = async (req, res, next) => {
  const id = req.params.contactId;
  const updateContact = await removeContact.removeContact(id);
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

module.exports = {
  addDeleteContact,
};
