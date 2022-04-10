const express = require("express");
const router = express.Router();

const {
  registration,
  login,
  logout,
} = require("../../../controllers/auth/index");
const guard = require("../../../middlewares/guard");
const { wrapper: wrapperError } = require("../../../middlewares/error-handler");

router.post("/registration", wrapperError(registration));
router.post("/login", wrapperError(login));
router.post("/logout", guard, wrapperError(logout));

module.exports = router;
