const { Contact } = require("../service/index");

// async function listContacts(
//   { limit, page, sortCriteria, select, favorite },
//   user
// ) {
//   const total = await Contact.countDocuments({ owner: user.id });
//   const data = await Contact.find({ owner: user.id })
//     .select(select)
//     .skip(page)
//     .limit(limit)
//     .sort(sortCriteria);

//   return { total, contacts: data };
// }

async function listContacts(
  { limit, page, sortCriteria, select, favorite },
  user
) {
  if(favorite===undefined){
    const {docs:contacts,...rest} = await Contact.paginate({ owner: user.id },{limit, offset:page, sortCriteria, select})
    return { contacts, ...rest};
  }else{
    const {docs:contacts,...rest} = await Contact.paginate({ owner: user.id,favorite:favorite },{limit, offset:page, sortCriteria, select})
    return { contacts, ...rest};
  }
}

async function getContactById(contactId, user) {
  const result = await Contact.findOne({
    _id: contactId,
    owner: user.id,
  }).populate({
    path: "owner",
    select: "name email role",
  });
  return result;
}
module.exports = {
  listContacts,
  getContactById,
};
