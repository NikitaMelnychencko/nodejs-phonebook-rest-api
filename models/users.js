const User = require("../service/schemas/user");

const findByID = async (id) => {
  return await User.findById(id);
};
const findByEmail = async (email) => {
  return await User.findOne({ email });
};
const findByToken = async (verifyEmailToken) => {
  return await User.findOne({ verifyEmailToken });
};

const create = async (body) => {
  const user = await User(body);

  return await user.save();
};

const updateToken = async (id, token) => {
  return await User.findByIdAndUpdate(id, { token });
};

const updateSubscription = async (id, subscription) => {
  const result = await User.findOneAndUpdate(
    { owner: id },
    { subscription },
    { new: true }
  );
  return result;
};

const updateAvatar = async (id, avatar, cloudId = null) => {
  console.log(cloudId);
  return await User.findByIdAndUpdate(id, { avatar, cloudId });
};
const verifyUser = async (id) => {
  return await User.findByIdAndUpdate(id, {
    isVerify: true,
  });
};
module.exports = {
  findByID,
  findByEmail,
  create,
  updateToken,
  updateSubscription,
  updateAvatar,
  findByToken,
  verifyUser
};
