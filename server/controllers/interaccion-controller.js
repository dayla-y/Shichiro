import { Interacciones } from "../models/interaccion.js";

export const getAllInteracciones = async (req, res) => {
    try {
        const interacciones = await Interacciones.getAll();
        res.json(interacciones);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getInteraccionById = async (req, res) => {
    try {
        const interaccion = await Interacciones.getById(req.params.id);
        if (!interaccion) {
            return res.status(404).json({ error: 'Interacción no encontrada' });
        }
        res.json(interaccion);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getInteraccionesByJugadorId = async (req, res) => {
    try {
        const interacciones = await Interacciones.getByJugadorId(req.params.jugador_id);
        res.json(interacciones);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getInteraccionesByObjetoId = async (req, res) => {
    try {
        const interacciones = await Interacciones.getByObjetoId(req.params.objeto_id);
        res.json(interacciones);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createInteraccion = async (req, res) => {
    try {
        // Validar el tipo de interacción
        const tiposPermitidos = ['abrir', 'romper', 'recoger', 'usar', 'hablar'];
        if (!tiposPermitidos.includes(req.body.tipo_interaccion)) {
            return res.status(400).json({ error: 'Tipo de interacción no válido' });
        }

        const newInteraccion = await Interacciones.create(req.body);
        res.status(201).json(newInteraccion);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const updateInteraccion = async (req, res) => {
    try {
        // Validar el tipo de interacción si se está actualizando
        if (req.body.tipo_interaccion) {
            const tiposPermitidos = ['abrir', 'romper', 'recoger', 'usar', 'hablar'];
            if (!tiposPermitidos.includes(req.body.tipo_interaccion)) {
                return res.status(400).json({ error: 'Tipo de interacción no válido' });
            }
        }

        const updatedInteraccion = await Interacciones.update(req.params.id, req.body);
        if (!updatedInteraccion) {
            return res.status(404).json({ error: 'Interacción no encontrada' });
        }
        res.json(updatedInteraccion);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const deleteInteraccion = async (req, res) => {
    try {
        const deletedInteraccion = await Interacciones.delete(req.params.id);
        if (!deletedInteraccion) {
            return res.status(404).json({ error: 'Interacción no encontrada' });
        }
        res.json(deletedInteraccion);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};