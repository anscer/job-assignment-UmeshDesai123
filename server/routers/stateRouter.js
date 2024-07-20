const express = require('express');
const { createState, getAllState, updateStateC, deleteStateC } = require('../controllers/stateController');
const StateRouter = express.Router();

StateRouter.post('/', createState);
StateRouter.get('/all-states', getAllState);
StateRouter.put('/update', updateStateC);
StateRouter.delete('/:id', deleteStateC);

module.exports = StateRouter;