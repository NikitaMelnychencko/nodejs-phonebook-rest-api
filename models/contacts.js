const fs = require("fs/promises");
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "./contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  const products = JSON.parse(data);
  return products;
}

async function getContactById(contactId) {
  const listContact = await listContacts();
  const result = listContact.find((item) => item.id === contactId);
  return result;
}

async function removeContact(contactId) {
  const listContact = await listContacts();
  const delContact = listContact.find((item) => item.id === contactId);
  if (!delContact) {
    return null;
  } else {
    const newListContact = listContact.filter((item) => item.id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(newListContact));
  }
  return delContact;
}

async function addContact(name, email, phone) {
  const listContact = await listContacts();
  const newContact = { id: v4(), name, email, phone };
  const newOb = [...listContact, newContact];
  await fs.writeFile(contactsPath, JSON.stringify(newOb));
  return newContact;
}
const updateContact = async (contactId, body) => {
  const listContact = await listContacts();
  const updateUser = listContact.find((el) => el.id === contactId);
  if (updateUser) {
    const newListContact = listContact.map((item) => {
      if (item.id === contactId) {
        return { ...item, ...body };
      }
      return item;
    });
    await fs.writeFile(contactsPath, JSON.stringify(newListContact));
    return updateUser;
  } else {
    return null;
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
