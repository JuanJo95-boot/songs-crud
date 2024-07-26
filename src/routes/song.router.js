
const { getAll, create, getOne, destroy, update } = require('../controllers/song.controllers');
const express = require('express');

const songRouter = express.Router();

//!RUTAS ESTATICAS
songRouter.route("/") // -> el slash de ahí representa /cars
		.get(getAll)
        .post(create)


 songRouter.route("/:id")//!-> representa /cars/id los : significa que es un parametro dinamico
  .get(getOne)
  .delete(destroy)
  .put(update)      


module.exports = songRouter;
        