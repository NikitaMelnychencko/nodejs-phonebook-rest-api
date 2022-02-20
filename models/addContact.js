const fs = require("fs/promises");
const path = require("path");
const { v4 } = require("uuid");
const listContacts = require("./listContacts");
const contactsPath = path.join(__dirname, "../db/contacts.json");

async function addContact(name, email, phone) {
  const listContact = await listContacts.listContacts();
  const newContact = { id: v4(), name, email, phone };
  const newOb = [...listContact, newContact];
  await fs.writeFile(contactsPath, JSON.stringify(newOb));
  return newContact;
}
module.exports = {
  addContact,
};
