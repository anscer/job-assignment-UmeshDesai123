const { userDataValidation } = require("../utils/userValidation");
const bcrypt = require("bcryptjs");
const { createNewUser, getUserWithKey } = require('./../repositories/userRepository');

const createUser = async (req, res)=>{
  // console.log(req.body);
  const { name, email, password } = req.body;

  //data validation
  try {
    await userDataValidation({ email, name, password });
  } catch (error) {
    return res.status(400).send({
      error: error.message || error
    });
  }

  //save user
  try {
    const hashedPassword = await bcrypt.hash(password,10);
    const user = await createNewUser({ email, name, password: hashedPassword });
    // console.log(user);
    return res.status(201).send(user)
  } catch (error) {
    console.log('errrrr', error)
    return res.status(400).send({error: error.message || error});
  }
}

const login = async (req, res) => {
  try {
    const {email, password} = req.body;
    if(!email || !password) return res.status(400).send('Enter all details');
    const user = await getUserWithKey(email);
    if(!user) return res.status(400).send('User not found');

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
      return res.status(400).send('Incorrect password');
    }
    user.password = undefined;
    
    console.log(req.session);
    req.session.isAuth = true;
    req.session.user = {
      userId: user._id,
      email: user.email,
    };
    return res.send(user);
  } catch (error) {
    console.error(error);
    return res.status(500).send({error: error.message || error})
  }
}

const logout = (req, res) => {
  // console.log(req.session.id);
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send({
        message: "Logout unsuccessfull",
        error: err.message ?? err
      });
    }
    return res.send({
      message: "logout successfull",
    });
  });
};

module.exports = {
  createUser,
  login,
  logout
}