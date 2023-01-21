const { Router } = require ('express');
const controller = require('../controllers/book-controller');

const routes = Router();

routes.get('/test', controller.getTest);
routes.get('/books', controller.getBooks);


//routes.get("/messages", res.send("test"));


module.exports = routes;