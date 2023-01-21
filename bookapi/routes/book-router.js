const { Router } = require ('express');
const controller = require('../controllers/book-controller');

const routes = Router();

routes.get('/books', controller.getTest);



//routes.get("/messages", res.send("test"));


module.exports = routes;