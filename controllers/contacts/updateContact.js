const { updateContact } = require("../../models/index");

const addUpdateContact = async (req, res, next) => {
  const body = req.body;
  const id = req.params.contactId;
  const upContact = await updateContact.updateContact(id, body);
  if (upContact) {
    res.status(200).json({
      status: "OK",
      code: 200,
      message: `Contact is update`,
      data: upContact,
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
  addUpdateContact,
};
