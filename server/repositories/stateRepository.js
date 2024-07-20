const stateModel = require('./../schemas/stateSchema');
const { getUserWithKey } = require('./userRepository');

const createNewState = async (stateData) => {
  try {
    const state = new stateModel({
      name: stateData.name,
      description: stateData.description,
      status: stateData.status,
      createdAt: Date.now(),
      createdBy: stateData.user,
    });

    const savedState = await state.save();
    const user = await getUserWithKey(stateData.user);
    savedState.createdBy = user.name;
    // console.log(savedState);
    return savedState;
  } catch (error) {
    throw error
  }
}

const getStateById = async (id) => {
  try {
    const state = await stateModel.findById(id);
    return state
  } catch (error) {
    throw error;
  }
}

const getAllStates = async () => {
  try {
    const states = await stateModel.aggregate([
      {
        $addFields: {
          createdByObjectId: { $toObjectId: "$createdBy" }
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "createdByObjectId",
          foreignField: "_id",
          as: "creator"
        }
      },
      {
        $unwind: "$creator"
      },
      {
        $project: {
          _id: 1,
          name: 1,
          description: 1,
          status: 1,
          createdAt: 1,
          createdBy: "$creator.name"
        }
      }
    ]);
    // console.log(states);
    return states;
  } catch (error) {
    throw error;
  }
}

const updateState = async (data) => {
  try {
    const state = await stateModel.findByIdAndUpdate(data.id,
      {
        name: data.name,
        description: data.description,
        status: data.status,
        createdBy: data.user,
        updatedAt: Date.now(),
      },
      { new: true }
    );
    return state;
  } catch (error) {
    throw error;
  }
}

const deleteState = async (id) => {
  try {
    const state = await stateModel.deleteOne({_id: id});
    return state;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createNewState,
  getAllStates,
  getStateById,
  updateState,
  deleteState
}