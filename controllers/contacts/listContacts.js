const contactService = require("../../service/contacts");

const addGetContact = async (req, res, next) => {
  const listContact = await contactService.getAll(req.query, req.user);
  res.status(200).json({
    status: "OK",
    code: 200,
    message: "All contacts",
    data: { ...listContact },
  });
};

const addGetContactById = async (req, res, next) => {
  const id = req.params.contactId;
  const getContact = await contactService.getById(id, req.user);
  return res.status(200).json({
    status: "OK",
    code: 200,
    message: `Contacts ${id} find`,
    data: getContact,
  });
};

const getStatistics = async (req, res, next) => {
  const getStatistics = await contactService.getAgeStatistics(req.user);
  return res.status(200).json({
    status: "OK",
    code: 200,
    data: getStatistics,
  });
};
module.exports = {
  addGetContact,
  addGetContactById,
  getStatistics,
};
