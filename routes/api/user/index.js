const express = require("express");
const router = express.Router();
const limiter = require("../../../libs/limiter");

const {
  updateSubscription,
  avatar
} = require("../../../controllers/user/index");
const guard = require("../../../middlewares/guard");
const { wrapper: wrapperError } = require("../../../middlewares/error-handler");
const { subscriptionValidation } = require("../../../middlewares/validationMiddleware");
const upload = require("../../../middlewares/uploud");

router.patch(
  "/",
  limiter(15 * 60 * 1000, 50),
  guard,
  subscriptionValidation,
  wrapperError(updateSubscription)
);


router.patch(
  "/avatar",
  limiter(15 * 60 * 1000, 50),
  guard,
  upload.single('avatar'),
  wrapperError(avatar)
);

module.exports = router;