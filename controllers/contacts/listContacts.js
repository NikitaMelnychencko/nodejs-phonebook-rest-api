const contactMethod = require("../../models/index");
const { getContactById, listContacts } = contactMethod.listContacts;

const addGetContact = async (req, res, next) => {
  const listContact = await listContacts();

  res.status(200).json({
    status: "OK",
    code: 200,
    message: "All contacts",
    data: listContact,
  });
};

const addGetContactById = async (req, res, next) => {
  const id = req.params.contactId;
  const getContact = await getContactById(id);
  if (getContact) {
    res.status(200).json({
      status: "OK",
      code: 200,
      message: `Contacts ${id} find`,
      data: getContact,
    });
  } else {
    res.status(404).json({
      status: "Not found",
      code: 404,
      message: `Contacts ${id} Not found`,
    });
  }
};
module.exports = {
  addGetContact,
  addGetContactById,
};
