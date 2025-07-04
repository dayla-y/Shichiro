import { NPCs } from "../models/npc.js";

export const getAllNPCs = async (req, res) => {
    try {
        const npcs = await NPCs.getAll();
        res.json(npcs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getNPCById = async (req, res) => {
    try {
        const npc = await NPCs.getById(req.params.id);
        if (!npc) {
            return res.status(404).json({ error: 'NPC no encontrado' });
        }
        res.json(npc);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createNPC = async (req, res) => {
    try {
        const newNPC = await NPCs.create(req.body);
        res.status(201).json(newNPC);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const updateNPC = async (req, res) => {
    try {
        const updatedNPC = await NPCs.update(req.params.id, req.body);
        if (!updatedNPC) {
            return res.status(404).json({ error: 'NPC no encontrado' });
        }
        res.json(updatedNPC);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const deleteNPC = async (req, res) => {
    try {
        const deletedNPC = await NPCs.delete(req.params.id);
        if (!deletedNPC) {
            return res.status(404).json({ error: 'NPC no encontrado' });
        }
        res.json(deletedNPC);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controladores para métodos adicionales
export const getNPCsByEscena = async (req, res) => {
    try {
        const npcs = await NPCs.getByEscena(req.params.escena);
        res.json(npcs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getNPCsByTipo = async (req, res) => {
    try {
        const npcs = await NPCs.getByTipo(req.params.tipo);
        res.json(npcs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateNPCPosicion = async (req, res) => {
    try {
        const { posicion_x, posicion_y, direccion } = req.body;
        const updatedNPC = await NPCs.updatePosicion(
            req.params.id, 
            posicion_x, 
            posicion_y, 
            direccion
        );
        if (!updatedNPC) {
            return res.status(404).json({ error: 'NPC no encontrado' });
        }
        res.json(updatedNPC);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const updateNPCEstado = async (req, res) => {
    try {
        const { estado_actual } = req.body;
        const updatedNPC = await NPCs.updateEstado(
            req.params.id, 
            estado_actual
        );
        if (!updatedNPC) {
            return res.status(404).json({ error: 'NPC no encontrado' });
        }
        res.json(updatedNPC);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};