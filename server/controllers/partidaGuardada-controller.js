import { PartidasGuardadas } from "../models/partidaGuardada.js";

export const getPartidasByPlayer = async (req, res) => {
    try {
        const partidas = await PartidasGuardadas.getAllByPlayer(req.params.jugador_id);
        res.json(partidas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getLatestPartidaByPlayer = async (req, res) => {
    try {
        const partida = await PartidasGuardadas.getLatestByPlayer(req.params.jugador_id);
        if (!partida) {
            return res.status(404).json({ error: 'No se encontraron partidas guardadas para este jugador' });
        }
        res.json(partida);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getPartidaById = async (req, res) => {
    try {
        const partida = await PartidasGuardadas.getById(req.params.id);
        if (!partida) {
            return res.status(404).json({ error: 'Partida no encontrada' });
        }
        res.json(partida);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createPartida = async (req, res) => {
    try {
        const nuevaPartida = await PartidasGuardadas.create(req.body);
        res.status(201).json(nuevaPartida);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const updatePartida = async (req, res) => {
    try {
        const partidaActualizada = await PartidasGuardadas.update(req.params.id, req.body);
        if (!partidaActualizada) {
            return res.status(404).json({ error: 'Partida no encontrada' });
        }
        res.json(partidaActualizada);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const deletePartida = async (req, res) => {
    try {
        const partidaEliminada = await PartidasGuardadas.delete(req.params.id);
        if (!partidaEliminada) {
            return res.status(404).json({ error: 'Partida no encontrada' });
        }
        res.json(partidaEliminada);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};