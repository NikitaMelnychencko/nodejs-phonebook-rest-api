const { Contact } = require("../service/index");

const updateContact = async (contactId, body, user) => {
  const result = await Contact.findOneAndUpdate(
    { _id: contactId, owner: user.id },
    { ...body },
    { new: true }
  ).populate({
    path:'owner',
    select: 'name email role'
  });
  return result;
};
module.exports = {
  updateContact,
};
