const fs = require("fs/promises");
const path = require("path");

const listContacts = require("./listContacts");
const contactsPath = path.join(__dirname, "../db/contacts.json");

const updateContact = async (contactId, body) => {
  const listContact = await listContacts.listContacts();
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
  updateContact,
};
