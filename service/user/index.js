const Users = require("../../models/users");
const { CustomError } = require("../../middlewares/error-handler");
class UserService {
  async updateSubscription(id,subscription) {
    if (
      subscription !== "starter" &&
      subscription !== "pro" &&
      subscription !== "business"
    ) {
      throw new CustomError(401, "Invalid Subscription is wrong");
    } else {
      return await Users.updateSubscription(id,subscription);
    }
  }
}

module.exports = new UserService();
