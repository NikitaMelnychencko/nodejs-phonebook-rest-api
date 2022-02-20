const fs = require("fs/promises");
const path = require("path");
const listContacts = require("./listContacts");

const contactsPath = path.join(__dirname, "../db/contacts.json");

async function removeContact(contactId) {
  const listContact = await listContacts.listContacts();
  const delContact = listContact.find((item) => item.id === contactId);
  if (!delContact) {
    return null;
  } else {
    const newListContact = listContact.filter((item) => item.id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(newListContact));
  }
  return delContact;
}

module.exports = {
  removeContact,
};
