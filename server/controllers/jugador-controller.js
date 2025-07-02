import { Jugadores } from "../models/jugador.js";

export const getAllJugadores = async (req, res) => {
    try {
        const jugadores = await Jugadores.getAll();
        res.json(jugadores);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getJugadorById = async (req, res) => {
    try {
        const jugador = await Jugadores.getById(req.params.id);
        if (!jugador) {
            return res.status(404).json({ error: 'Jugador no encontrado' });
        }
        res.json(jugador);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createJugador = async (req, res) => {
    try {
        const newJugador = await Jugadores.create(req.body);
        res.status(201).json(newJugador);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const updateJugador = async (req, res) => {
    try {
        const updatedJugador = await Jugadores.update(req.params.id, req.body);
        if (!updatedJugador) {
            return res.status(404).json({ error: 'Jugador no encontrado' });
        }
        res.json(updatedJugador);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const deleteJugador = async (req, res) => {
    try {
        const deletedJugador = await Jugadores.delete(req.params.id);
        if (!deletedJugador) {
            return res.status(404).json({ error: 'Jugador no encontrado' });
        }
        res.json(deletedJugador);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Métodos específicos para jugadores
export const updateJugadorPosition = async (req, res) => {
    try {
        const { posicion_x, posicion_y } = req.body;
        const updatedJugador = await Jugadores.updatePosition(req.params.id, posicion_x, posicion_y);
        if (!updatedJugador) {
            return res.status(404).json({ error: 'Jugador no encontrado' });
        }
        res.json(updatedJugador);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const updateJugadorHealth = async (req, res) => {
    try {
        const { salud_actual } = req.body;
        const updatedJugador = await Jugadores.updateHealth(req.params.id, salud_actual);
        if (!updatedJugador) {
            return res.status(404).json({ error: 'Jugador no encontrado' });
        }
        res.json(updatedJugador);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const updateJugadorState = async (req, res) => {
    try {
        const { estado_actual } = req.body;
        const updatedJugador = await Jugadores.updateState(req.params.id, estado_actual);
        if (!updatedJugador) {
            return res.status(404).json({ error: 'Jugador no encontrado' });
        }
        res.json(updatedJugador);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};