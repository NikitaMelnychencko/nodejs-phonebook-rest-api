const express = require("express");
const router = express.Router();

const {
  addPostValidation,
  addPutValidation,
} = require("../../middlewares/validationMiddleware");

const {
  listContacts,
  removeContact,
  addContact,
  updateContact,
} = require("../../controllers/contacts/index");

const { addGetContact, addGetContactById } = listContacts;
const { addDeleteContact } = removeContact;
const { addPostContact } = addContact;
const { addUpdateContact } = updateContact;

router.get("/", addGetContact);

router.get("/:contactId", addGetContactById);

router.post("/", addPostValidation, addPostContact);

router.delete("/:contactId", addDeleteContact);

router.put("/:contactId", addPutValidation, addUpdateContact);

module.exports = router;
