const express = require('express');
const router = express.Router();
const songRouter = require('../routes/song.router')

// colocar las rutas aquí
router.use('/songs', songRouter)

module.exports = router;