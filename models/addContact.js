const { Contact } = require("../service/index");

async function addContact(name, email, age, phone, favorite, user) {
  const result = await Contact.create({
    name,
    email,
    age,
    phone,
    favorite,
    owner: user.id,
  });
  return result;
}

module.exports = {
  addContact,
};
