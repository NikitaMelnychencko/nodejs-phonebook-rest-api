const { Contact } = require("../service/index");

async function putchFavorite(contactId, value, user) {
  const result = await Contact.findOneAndUpdate(
    { _id: contactId, owner: user.id },
    { favorite: value },
    { new: true }
  ).populate({
    path:'owner',
    select: 'name email role'
  });
  return result;
}
module.exports = putchFavorite;
