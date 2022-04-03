const { putchFavorite } = require("../../models/index");

const putchFavoriteFild = async (req, res, next) => {
  const { favorite } = req.body;
  const id = req.params.contactId;
  const contactFild = await putchFavorite(id, favorite);
    if (contactFild) {
    res.status(200).json({
      status: "OK",
      code: 200,
      message: `Contact is update`,
      data: contactFild,
    });
  } else {
    res.status(404).json({
      status: "Not Found",
      code: 404,
      message: `Not Found`,
    });
  }
}

module.exports = putchFavoriteFild;