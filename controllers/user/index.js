const UserService = require("../../service/user/index");

const updateSubscription = async (req, res) => {
  const user = await UserService.updateSubscription(
    req.user.id,
    req.body.subscription
  );
  console.log(user);
  return res.status(200).json({
    status: "OK",
    code: 200,
    message: `Subscription is update`,
    data: user,
  });
};

module.exports = { updateSubscription };
