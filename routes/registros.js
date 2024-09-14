//Create Read Update Delete

const express = require('express');
const router = express.Router();
const Registro = require('../models/Registro');

//Crear un nuevo registro

router.post('/', async (req, res) => {

    const { name, email, password } = req.body;
    console.log("respuesta recibida", req.body);

    try {
        const newRegistro = new Registro({ name, email, password });
        await newRegistro.save();
        res.status(201).json(newRegistro);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

//Obtener todos los registros

router.get('/', async (req, res) => {
    try {
        const registro = await Registro.find();
        res.json(registro);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//Obtener un registro ID

router.get('/:id', async (req, res) => {
    try {
        const registro = await Registro.findById(req.params.id);
        if (!registro) return res.status(404).json({ message: 'No Found' });
        res.json(registro);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//Actualizar un registro

router.put('/:id', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const updatedRegistro = await Registro.findByIdAndUpdate(req.params.id,
            { name, email, password }, { new: true });
        if (!updatedRegistro) return res.status(404).json({ message: 'Not Found' })
    } catch (err) {
        res.status(400).json({ message: err.message });

    }
});

//Eliminar un registro por ID

router.delete('/:id', async (req, res) => {
    try {
        const deletedRegistro = await Registro.findByIdAndDelete(req.params.id);
        if (!deletedRegistro) return res.status(404).json({ message: 'Not Found ' });
        res.json({ message: 'Deleted Succefully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }

});

module.exports = router;