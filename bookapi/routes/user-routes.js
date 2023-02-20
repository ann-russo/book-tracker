const { Router } = require ('express');
const UserController = require('../controllers/user-controller');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user-model')
const routes = Router();



routes.post('/registration', UserController.register);
routes.post('/login', UserController.login);
routes.get('/user', UserController.getUserData);
routes.post('/logout', UserController.logoutUser);
routes.post('/updateuser', UserController.updateUser);
routes.delete('/deleteuser', UserController.deleteuser);

module.exports = routes;