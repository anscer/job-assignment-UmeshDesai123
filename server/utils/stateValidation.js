const stateDataValidation = ({ name, description, status}) => {
  return new Promise((resolve, reject) => {
    if (!name || typeof name !== "string") reject("name is required");
    if (!description || typeof description !== "string") reject("description is required");
    if (!status || typeof status !== "string") reject("status is required");
    resolve();
  });
};

module.exports = { stateDataValidation };