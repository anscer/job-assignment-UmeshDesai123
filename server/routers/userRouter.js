const express = require('express');
const { createUser, login, logout } = require('../controllers/userController');
const UserRouter = express.Router();

UserRouter.post('/', createUser);
UserRouter.post('/login', login);
UserRouter.post('/logout', logout)

module.exports = UserRouter;