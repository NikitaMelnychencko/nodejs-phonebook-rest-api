const { Contact } = require("../service/index");

async function removeContact(contactId, user) {
  const delContact = await Contact.findOneAndRemove({
    _id: contactId,
    owner: user.id,
  })
  return delContact;
}

module.exports = {
  removeContact,
};
