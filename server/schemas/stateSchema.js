const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StateSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  createdBy: {
    type: String,
    required: true,
  },
  updatedAt: {
    type: Date
  },
});

const stateModel = mongoose.model("state", StateSchema);

module.exports = stateModel;