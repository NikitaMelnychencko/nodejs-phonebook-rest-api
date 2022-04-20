const role = (role) => async (req, res, next) => {
  const currentUserRole = req.user.role;
  if (currentUserRole !== role) {
    return res.status(403).send({
      status: "error",
      code: 403,
      message: "Access denied",
    });
  }

  next();
};

module.exports = role;
