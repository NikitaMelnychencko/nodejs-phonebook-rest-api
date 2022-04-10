const User = require("../service/schemas/user");

const findByID = async (id) => {
  return await User.findById(id);
};
const findByEmail = async (email) => {
  return await User.findOne({ email });
};

const create = async (body) => {
  const user = await User(body);

  return await user.save();
};

const updateToken = async(id,token)=>{
  return await User.findByIdAndUpdate(id,{token})
}
module.exports={findByID,findByEmail,create,updateToken}