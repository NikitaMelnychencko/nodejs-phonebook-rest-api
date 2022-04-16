const express = require("express");
const router = express.Router();
const {Role} = require('../../../libs/constants')
const {
  addPostValidation,
  addPutValidation,
  patchValidation,
} = require("../../../middlewares/validationMiddleware");

const {
  listContacts,
  removeContact,
  addContact,
  updateContact,
  putchFavoriteFild,
} = require("../../../controllers/contacts/index");

const { addGetContact, addGetContactById, getStatistics } = listContacts;
const { addDeleteContact } = removeContact;
const { addPostContact } = addContact;
const { addUpdateContact } = updateContact;
const guard = require("../../../middlewares/guard");
const role = require("../../../middlewares/role");
const { wrapper: wrapperError } = require("../../../middlewares/error-handler");

router.get("/", guard, addGetContact);

router.get("/statistics", guard, role(Role.ADMIN), wrapperError(getStatistics));

router.get("/:contactId", guard, wrapperError(addGetContactById));

router.post("/", guard, addPostValidation, addPostContact);

router.delete("/:contactId", guard, wrapperError(addDeleteContact));

router.put("/:contactId", guard, addPutValidation, wrapperError(addUpdateContact));

router.patch("/:contactId/favorite", guard, patchValidation, wrapperError(putchFavoriteFild));

module.exports = router;
