const jwt = require("jsonwebtoken");
const Users = require("../../models/users");
const SECRET_KEY = process.env.JWT_SECRET_KEY;
const { CustomError } = require("../../middlewares/error-handler");
const EmailService = require('../email/service')
const SenderSendGrid = require('../email/senders/sendgrid-sender')
const SenderNodemailer = require ('../email/senders/nodemailer-senders');

class AuthService {
  async create(body) {
    const user = await Users.findByEmail(body.email);
    if (user) {
      throw new CustomError(409, "User already exists");
    }

    const newUser = await Users.create(body)

    const sender = new SenderSendGrid()
    const emailService = new EmailService(sender)
    try {
      await emailService.sendEmail(
        newUser.email,
        newUser.name,
        newUser.verifyEmailToken,
      )
    } catch (error) {
      console.log(error)
    }

    return {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      avatar:newUser.avatar,
    };
  }

  async login(email, password) {
    const user = await this.getUser(email, password);
    const token = this.generateToken(user);
    await Users.updateToken(user.id, token);
    return { token };
  }

  async getUser(email, password) {
    const user = await Users.findByEmail(email);
    if (!user) {
      throw new CustomError(404, 'Not found ')
    }

    if (!(await user?.isValidPass(password))) {
      throw new CustomError(401, 'Invalid credential')
    }
    if(!user?.isVerify){
      throw new CustomError(400, 'User not verified')
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
  
  async verifyUser(token){
    const user = await Users.findByToken(token)
    if(!user){
      throw new CustomError(400, 'Invalid token')
    }
    if (user&&user.isVerify) {
      throw new CustomError(400,'User already verified')
    }

    await Users.verifyUser(user.id)
    return user
  }
  
  async reverifyEmail(email) {
    const user = await Users.findByEmail(email)
    if (!user) {
      throw new CustomError(
        HTTP_STATUS_CODE.NOT_FOUND,
        'User with email not found',
      )
    }

    if (user && user.isVerify) {
      throw new CustomError(
        HTTP_STATUS_CODE.BAD_REQUEST,
        'User already verified',
      )
    }

    const sender = new SenderNodemailer()
    const emailService = new EmailService(sender)
    try {
      await emailService.sendEmail(user.email, user.name, user.verifyEmailToken)
    } catch (error) {
      console.log(error)
      throw new CustomError(
        503,
        'Error sending email',
      )
    }
  }
}

module.exports = new AuthService();
