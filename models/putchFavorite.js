const {Contact} = require("../service/index");

async function putchFavorite(contactId, value) {
  const result = await Contact.findOneAndUpdate({_id:contactId},{favorite:value},{new:true});
  return result
}
module.exports = putchFavorite;