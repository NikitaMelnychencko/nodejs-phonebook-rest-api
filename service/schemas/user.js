const { Schema, model } = require("mongoose");
const { Role } = require("../../libs/constants");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");

const userSchema = new Schema({
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    validate(value) {
      const re = /\S+@\S+\.\S+/;
      return re.test(String(value).toLowerCase());
    },
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter",
  },
  token: {
    type: String,
    default: null,
  },
  role: { type: String, enum: Object.values(Role), default: Role.USER },
  avatar: {
    type: String,
    default: function () {
      return gravatar.url(this.email, { s: "250" }, true);
    },
  },
  cloudId: { type: String, default: null },
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(6);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

userSchema.methods.isValidPass = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = model("user", userSchema);
module.exports = User;
