const { Contact } = require("../service/index");
const { Types } = require("mongoose");

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
  if (favorite === undefined) {
    const { docs: contacts, ...rest } = await Contact.paginate(
      { owner: user.id },
      { limit, offset: page, sortCriteria, select }
    );
    return { contacts, ...rest };
  } else {
    const { docs: contacts, ...rest } = await Contact.paginate(
      { owner: user.id, favorite: favorite },
      { limit, offset: page, sortCriteria, select }
    );
    return { contacts, ...rest };
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

const getStatistics = async (user) => {
  console.log(user);
  const results = await Contact.aggregate([
    { $match: { owner: Types.ObjectId(user.id) } },
    {
      $group: {
        _id: "$status",
        sumAge: { $sum: "$age" },
        maxAge: { $max: "$age" },
        minAge: { $min: "$age" },
        avgAge: { $avg: "$age" },
        count: { $sum: 1 },
      },
    },
  ]);
  return results;
};
module.exports = {
  listContacts,
  getContactById,
  getStatistics,
};
