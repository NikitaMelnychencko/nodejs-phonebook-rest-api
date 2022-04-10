
const {Contact} = require("../service/index");

async function removeContact(contactId) {
  const delContact = await Contact.findOneAndRemove({_id:contactId});
  return delContact;
}

module.exports = {
  removeContact,
};
