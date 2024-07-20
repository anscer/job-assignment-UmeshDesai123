const isEmailValidator = ({ str }) => {
  const isEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(str);
  return isEmail;
};

const userDataValidation = ({ name, email, password }) => {
  return new Promise((resolve, reject) => {
    if (!name || typeof name !== "string") reject("name is required");
    if (!password || typeof password !== "string") reject("password is required");
    if (!email || typeof email !== "string") reject("email is required");
    if (!isEmailValidator({ str: email })) reject("Email format is incorrect");

    resolve();
  });
};

module.exports = { userDataValidation, isEmailValidator };
