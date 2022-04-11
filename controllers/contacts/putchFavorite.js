const contactService = require("../../service/contacts");
const putchFavoriteFild = async (req, res, next) => {
  const { favorite } = req.body;
  const id = req.params.contactId;
  const contactFild = await contactService.putchFavorite(id, favorite);
  return res.status(200).json({
    status: "OK",
    code: 200,
    message: `Contact is update`,
    data: contactFild,
  });
};

module.exports = putchFavoriteFild;
