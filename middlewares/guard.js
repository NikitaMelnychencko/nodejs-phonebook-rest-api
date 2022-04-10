const jwt = require("jsonwebtoken");
const Users = require("../models/users");
const SECRET_KEY = process.env.JWT_SECRET_KEY;

const guard = async (req, res, next) => {
  const token = req.get("Authorization")?.split(" ")[1];
  const isValid = verifyToken(token)
  if (!isValid) {
    return invalidToken(res)
  }
  const payload = jwt.decode(token);
  const user = await Users.findByID({ _id: payload.id });
  if (!user|| user.token!==token) {
    return invalidToken(res)
  }
  req.user = user; // res.locals.user = user
  next();
};
const verifyToken = (token) => {
  try {
    const t = jwt.verify(token, SECRET_KEY);
    console.log(t);
    return !!t;
  } catch (error) {
    return false;
  }
};
const invalidToken =(res)=>{
  return res.status(401).send({
    status: "error",
    code: 401,
    massage: "Invalid token",
  });
}
module.exports = guard;
