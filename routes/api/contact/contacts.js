const express = require("express");
const router = express.Router();

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

const { addGetContact, addGetContactById } = listContacts;
const { addDeleteContact } = removeContact;
const { addPostContact } = addContact;
const { addUpdateContact } = updateContact;
const guard = require("../../../middlewares/guard");

router.get("/", guard, addGetContact);

router.get("/:contactId", guard, addGetContactById);

router.post("/", guard, addPostValidation, addPostContact);

router.delete("/:contactId", guard, addDeleteContact);

router.put("/:contactId", guard, addPutValidation, addUpdateContact);

router.patch("/:contactId/favorite", guard, patchValidation, putchFavoriteFild);

module.exports = router;
