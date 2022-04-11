const jwt = require("jsonwebtoken");
const Users = require("../../models/users");
const SECRET_KEY = process.env.JWT_SECRET_KEY;
const { CustomError } = require("../../middlewares/error-handler");
class AuthService {
  async create(body) {
    const user = await Users.findByEmail(body.email);
    if (user) {
      throw new CustomError(409, "User already exists");
    }
    const newUser = await Users.create(body);
    return {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
    };
  }

  async login(email, password) {
    const user = await this.getUser(email, password);
    if (!user) {
      throw new CustomError(401, "Invalid Email or password is wrong");
    }
    const token = this.generateToken(user);
    await Users.updateToken(user.id, token);
    return { token };
  }

  async getUser(email, password) {
    const user = await Users.findByEmail(email);
    if (!user) {
      return null;
    }

    if (!(await user?.isValidPass(password))) {
      return null;
    }
    return user;
  }

  generateToken(user) {
    const id = user.id;
    const payload = { id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "2h" });
    return token;
  }

  async logout(id) {
    await Users.updateToken(id, null);
  }
}

module.exports = new AuthService();
