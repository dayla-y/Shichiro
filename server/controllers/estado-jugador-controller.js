import { EstadosJugador } from "../models/estado-jugador.js";

export const getAllEstadosJugador = async (req, res) => {
    try {
        const estados = await EstadosJugador.getAll();
        res.json(estados);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getEstadoJugadorById = async (req, res) => {
    try {
        const estado = await EstadosJugador.getById(req.params.id);
        if (!estado) {
            return res.status(404).json({ error: 'Estado no encontrado' });
        }
        res.json(estado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getEstadosByJugadorId = async (req, res) => {
    try {
        const estados = await EstadosJugador.getByJugadorId(req.params.jugador_id);
        res.json(estados);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createEstadoJugador = async (req, res) => {
    try {
        const newEstado = await EstadosJugador.create(req.body);
        res.status(201).json(newEstado);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const updateEstadoJugador = async (req, res) => {
    try {
        const updatedEstado = await EstadosJugador.update(req.params.id, req.body);
        if (!updatedEstado) {
            return res.status(404).json({ error: 'Estado no encontrado' });
        }
        res.json(updatedEstado);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const deleteEstadoJugador = async (req, res) => {
    try {
        const deletedEstado = await EstadosJugador.delete(req.params.id);
        if (!deletedEstado) {
            return res.status(404).json({ error: 'Estado no encontrado' });
        }
        res.json(deletedEstado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateJugadorState = async (req, res) => {
    try {
        const { nuevo_estado } = req.body;
        const updatedEstado = await EstadosJugador.updateState(req.params.jugador_id, nuevo_estado);
        res.json(updatedEstado);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};