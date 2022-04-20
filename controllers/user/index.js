const UserService = require("../../service/user/index");
const AvatarService = require("../../service/avatar");
const LocalStorage = require("../../service/avatar/local-storage");

const updateSubscription = async (req, res) => {
  const user = await UserService.updateSubscription(
    req.user.id,
    req.body.subscription
  );
  return res.status(200).json({
    status: "OK",
    code: 200,
    message: `Subscription is update`,
    data: user,
  });
};

const avatar = async (req, res) => {
  const uploadService = new AvatarService(LocalStorage, req.file, req.user);
  const urlOfAvatar = await uploadService.update();
  return res.status(200).json({
    status: "OK",
    code: 200,
    data: { avatar: urlOfAvatar },
    message: `Avatar updated`,
  });
};

module.exports = { updateSubscription, avatar };
