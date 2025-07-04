import { Escenas } from "../models/escena.js";

export const getAllEscenas = async (req, res) => {
    try {
        const escenas = await Escenas.getAll();
        res.json(escenas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getEscenaById = async (req, res) => {
    try {
        const escena = await Escenas.getById(req.params.id);
        if (!escena) {
            return res.status(404).json({ error: 'Escena no encontrada' });
        }
        res.json(escena);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getEscenaByNombre = async (req, res) => {
    try {
        const escena = await Escenas.getByNombre(req.params.nombre);
        if (!escena) {
            return res.status(404).json({ error: 'Escena no encontrada' });
        }
        res.json(escena);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createEscena = async (req, res) => {
    try {
        const newEscena = await Escenas.create(req.body);
        res.status(201).json(newEscena);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const updateEscena = async (req, res) => {
    try {
        const updatedEscena = await Escenas.update(req.params.id, req.body);
        if (!updatedEscena) {
            return res.status(404).json({ error: 'Escena no encontrada' });
        }
        res.json(updatedEscena);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const deleteEscena = async (req, res) => {
    try {
        const deletedEscena = await Escenas.delete(req.params.id);
        if (!deletedEscena) {
            return res.status(404).json({ error: 'Escena no encontrada' });
        }
        res.json(deletedEscena);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};