const authService = require("../../service/auth/index");

const registration = async (req, res) => {
  const user = await authService.create(req.body);
  return res.status(201).json({
    status: "success",
    code: 201,
    data: { ...user },
  });
};
const login = async (req, res) => {
  const { email, password } = req.body;
  const token = await authService.login(email, password);
  return res.status(200).json({
    status: "success",
    code: 200,
    data: { token },
  });
};
const logout = async (req, res) => {
  await authService.logout(req.user.id);
  return res.status(204).json();
};
const verifyUser = async (req, res) => {
  const token = req.params.token;
  const user = await authService.verifyUser(token);
  return res.status(200).json({
    status: "success",
    code: 200,
    data: { massage: `User verified Welcome ${user.name}` },
  });
};
const reverifyEmail = async (req, res) => {
  const {email} = req.body
  const user = await authService.reverifyEmail(email)
  return res.status(200).json({
    status: "success",
    code: 200,
    data: { massage: `Success` },
  });
};
module.exports = { registration, login, logout, verifyUser, reverifyEmail };
