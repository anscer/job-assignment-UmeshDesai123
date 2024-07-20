const userModel = require("../schemas/userSchema");
const ObjectId = require("mongodb").ObjectId;

const createNewUser = async (userData) => {
  try {
    // check if user email/username already exist
    const existedUser = await getUserWithKey(userData.email);
    if(existedUser){
      throw new Error('Email already exists');
    }

    const user = new userModel({
      name: userData.name,
      email: userData.email,
      password: userData.password,
    });

    //save user
    const userDb = await user.save();
    const userObject = userDb.toObject();
    delete userObject.password;  // Remove the password field

    return(userObject); 
  } catch (error) {
    throw error;
  }
}

const getUserWithKey = async (key) => {
  try {
    // Find the user
    const userDb = await userModel.findOne({ 
      $or: [ 
        ObjectId.isValid(key) ? { _id: key } : { email: key }
      ]
    }).select('+password');
    // console.log('userr', userDb)
    return userDb;
  } catch (error) {
    console.log(error);
    throw new Error(error || 'An error occurred');
  }
}

module.exports = {
  createNewUser,
  getUserWithKey
}