const catchError = require('../utils/catchError');
const Song = require('../models/Song');
const getAll = catchError(async(req, res) => {
    const result = await Song.findAll()
    return res.json(result)
});

const create= catchError(async(req, res) => {
    // Operaciones...
    const result = await Song.create(req.body)// -> select * from cars; Esto es conocido cómo una instancia, lo que significa que es el modelo acompañado de un metodo de sequelize.
    return res.sendStatus(201).json(result)
});
const getOne = catchError(async(req, res) => {
    const { id }=req.params
    const result = await Song.findByPk(id)
    if(!result) return res.status(404).json( ` song ${id} not found` )
    return res.json(result)
});
const destroy = catchError(async(req, res) => {
    const { id }=req.params
    const result = await Song.destroy({
        where: { id }
    })
    if(!result) return res.status(404).json( ` song ${id} not found` )
    return res.sendStatus(204).json(`${id} was removed successfully`)
});

const update = catchError(async (req, res) => {
    const { id } = req.params
    const song = await Song.update(
        req.body, // paso las propiedades que quiero actualizar
        { where: { id }, returning: true } //Si quiero que la instancia me devuelva el estado final, si no le coloco returning: true, obtendre el valor sin actualizar.
    )

    if (song[0] === 0) return res.sendStatus(404)//Entro a la possicion 0 del array car, para que cuando el id solicitado no exista arroje este error.

    return res.status(200).json(song[1][0])//Entro a la posicion 1 y 0 de mi array para obtener directamente el objeto sin ver primero el 1, en la posicion 0 y despues si mi objeto en la posicion 1 del arreglo, de esta manera se vera directamente el objeto con los cambios realizados.
})




module.exports = {
    getAll,
    create,
    getOne,
    destroy,
    update
}