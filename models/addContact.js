const {Contact} = require("../service/index");

async function addContact(name, email, phone, favorite) {
  const result = await Contact.create({name, email, phone,favorite});
  return result;
}
module.exports = {
  addContact,
};
