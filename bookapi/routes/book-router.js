const {Router} = require('express');
const controller = require('../controllers/book-controller');

const routes = Router();

routes.get('/books', controller.getBooks);

module.exports = routes;