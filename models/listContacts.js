const {Contact} = require("../service/index");

async function listContacts() {
  const data = await Contact.find();
  return data;
}
async function getContactById(contactId) {
  const result = await Contact.findOne({ _id: contactId });
  return result;
}
module.exports = {
  listContacts,
  getContactById,
};
