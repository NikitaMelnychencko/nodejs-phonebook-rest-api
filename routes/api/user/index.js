const express = require("express");
const router = express.Router();
const limiter = require("../../../libs/limiter");

const {
  updateSubscription,
} = require("../../../controllers/user/index");
const guard = require("../../../middlewares/guard");
const { wrapper: wrapperError } = require("../../../middlewares/error-handler");
const { subscriptionValidation } = require("../../../middlewares/validationMiddleware");

router.patch(
  "/",
  limiter(15 * 60 * 1000, 50),
  guard,
  subscriptionValidation,
  wrapperError(updateSubscription)
);

module.exports = router;