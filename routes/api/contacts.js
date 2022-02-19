const express = require("express");
const router = express.Router();

const {
  addPostValidation,
  addPutValidation,
} = require("../../middlewares/validationMiddleware");

const {
  addGetContact,
  addGetContactById,
  addPostContact,
  addDeleteContact,
  addUpdateContact,
} = require("../../controllers/postsControllers");

router.get("/", addGetContact);

router.get("/:contactId", addGetContactById);

router.post("/", addPostValidation, addPostContact);

router.delete("/:contactId", addDeleteContact);

router.put("/:contactId", addPutValidation, addUpdateContact);

module.exports = router;
