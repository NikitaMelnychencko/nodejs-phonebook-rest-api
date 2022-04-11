const express = require("express");
const router = express.Router();
const limiter = require('../../../libs/limiter')

const {
  registration,
  login,
  logout,
} = require("../../../controllers/auth/index");
const guard = require("../../../middlewares/guard");
const { wrapper: wrapperError } = require("../../../middlewares/error-handler");

router.post("/registration",limiter(15*60*1000,50), wrapperError(registration));
router.post("/login",limiter(15*60*1000,50), wrapperError(login));
router.post("/logout", guard, wrapperError(logout));

module.exports = router;
