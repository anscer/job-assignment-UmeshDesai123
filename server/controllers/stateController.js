const { createNewState, getAllStates, getStateById, updateState, deleteState } = require("../repositories/stateRepository");
const { stateDataValidation } = require("../utils/stateValidation");
const ObjectId = require("mongodb").ObjectId;


const createState = async (req, res) => {
  const { name, description, status } = req.body;
  //data validation
  try {
    await stateDataValidation({name, description, status});
  } catch (error) {
    return res.status(400).send({
      error: error.message || error
    });
  }
  
  try {
    const newState = await createNewState({
      name, 
      description, 
      status, 
      user: req.session.user.userId
    });
    res.status(201).send(newState);
  } catch (error) {
    return res.status(500).send({
      error: error.message || error
    });
  }
}

const getAllState = async (req, res) => {
  try {
    const states = await getAllStates();
    return res.send(states);
  } catch (error) {
    return res.status(500).send({
      error: error.message || error
    });
  }
}

const updateStateC = async (req, res) => {
  const { id, name, description, status } = req.body;
  if(!id || !ObjectId.isValid(id)){
    return res.status(400).send({
      error: 'valid state id required'
    });
  }
  //data validation
  try {
    await stateDataValidation({name, description, status});
  } catch (error) {
    return res.status(400).send({
      error: error.message || error
    });
  }

  try {
    const state = await getStateById(id);
    if(state.createdBy != req.session.user.userId){
      return res.status(403).send('You are unauthorised to update state')
    }
    const updatedState = await updateState({ id, name, description, status });
    updatedState.createdBy = state.name;
    return res.send(updatedState);
  } catch (error) {
    return res.status(500).send({
      error: error.message || error
    });
  }
}

const deleteStateC = async (req, res) => {
  try {
    const {id} = req.params;
    if(!id){
      return res.status(400).send({
        error: 'valid state id required'
      });
    }
    const state = await getStateById(id);
    if(!state){
      return res.status(400).send({
        error: 'state not found'
      });
    }
    if(state.createdBy != req.session.user.userId){
      return res.status(403).send('You are unauthorised to update state')
    }
    const deletedState = await deleteState(id);
    return res.status(204).send(deletedState);
  } catch (error) {
    return res.status(500).send({
      error: error.message || error
    });
  }
}

module.exports = {
  createState,
  getAllState,
  updateStateC,
  deleteStateC
}