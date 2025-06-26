import { Recepciones } from "../models/recepciones.js";

export const getAllRecepciones = async (req, res) => {
    try {
        const recepciones = await Recepciones.getAll();
        res.json(recepciones);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getRecepcionById = async (req, res) => {
    try {
        const recepcion = await Recepciones.getById(req.params.id);
        if (!recepcion) {
            return res.status(404).json({ error: 'Recepción no encontrada' });
        }
        res.json(recepcion);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createRecepcion = async (req, res) => {
    try {
        const newRecepcion = await Recepciones.create(req.body);
        res.status(201).json(newRecepcion);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const updateRecepcion = async (req, res) => {
    try {
        const updatedRecepcion = await Recepciones.update(req.params.id, req.body);
        if (!updatedRecepcion) {
            return res.status(404).json({ error: 'Recepción no encontrada' });
        }
        res.json(updatedRecepcion);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const deleteRecepcion = async (req, res) => {
    try {
        const deletedRecepcion = await Recepciones.delete(req.params.id);
        if (!deletedRecepcion) {
            return res.status(404).json({ error: 'Recepción no encontrada' });
        }
        res.json(deletedRecepcion);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const validateRecepcion = async (req, res) => {
    try {
        const { id } = req.params;
        const { empleado_validador } = req.body;
        
        const validatedRecepcion = await Recepciones.validateRecepcion(id, empleado_validador);
        if (!validatedRecepcion) {
            return res.status(404).json({ error: 'Recepción no encontrada' });
        }
        res.json(validatedRecepcion);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getDetallesRecepcion = async (req, res) => {
    try {
        const detalles = await Recepciones.getDetallesByRecepcion(req.params.id);
        res.json(detalles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const addDetalleRecepcion = async (req, res) => {
    try {
        const { id } = req.params;
        const detalle = await Recepciones.addDetalleRecepcion({
            recepcion_id: id,
            ...req.body
        });
        res.status(201).json(detalle);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const updateDetalleRecepcion = async (req, res) => {
    try {
        const { id, detalleId } = req.params;
        const updated = await Recepciones.updateDetalleRecepcion(detalleId, req.body);
        if (!updated) {
            return res.status(404).json({ error: 'Detalle de recepción no encontrado' });
        }
        res.json(updated);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const removeDetalleRecepcion = async (req, res) => {
    try {
        const { id, detalleId } = req.params;
        const deleted = await Recepciones.removeDetalleRecepcion(detalleId);
        if (!deleted) {
            return res.status(404).json({ error: 'Detalle de recepción no encontrado' });
        }
        res.json(deleted);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};