const { Router } = require ('express');
const UserController = require('../controllers/user-controller');
const routes = Router();



routes.post('/registration', UserController.register);
routes.post('/login', UserController.login);
routes.get('/user', UserController.getUserData);
routes.post('/logout', UserController.logoutUser);
routes.post('/updateuser', UserController.updateUser);
routes.delete('/deleteuser', UserController.deleteuser);

module.exports = routes;