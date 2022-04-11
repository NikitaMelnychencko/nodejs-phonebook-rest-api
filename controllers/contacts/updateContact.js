const contactService = require("../../service/contacts");
const addUpdateContact = async (req, res, next) => {
  const body = req.body;
  const id = req.params.contactId;
  const upContact = await contactService.update(id, body);
  
  return res.status(200).json({
    status: "OK",
    code: 200,
    message: `Contact is update`,
    data: upContact,
  });
};
module.exports = {
  addUpdateContact,
};
