import { ObjetosNivel } from "../models/objeto-nivel-model.js";

export const getAllObjetosNivel = async (req, res) => {
    try {
        const objetos = await ObjetosNivel.getAll();
        res.json(objetos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getObjetoNivelById = async (req, res) => {
    try {
        const objeto = await ObjetosNivel.getById(req.params.id);
        if (!objeto) {
            return res.status(404).json({ error: 'Objeto no encontrado' });
        }
        res.json(objeto);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getObjetosByEscena = async (req, res) => {
    try {
        const objetos = await ObjetosNivel.getByEscena(req.params.escena);
        res.json(objetos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createObjetoNivel = async (req, res) => {
    try {
        const newObjeto = await ObjetosNivel.create(req.body);
        res.status(201).json(newObjeto);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const updateObjetoNivel = async (req, res) => {
    try {
        const updatedObjeto = await ObjetosNivel.update(req.params.id, req.body);
        if (!updatedObjeto) {
            return res.status(404).json({ error: 'Objeto no encontrado' });
        }
        res.json(updatedObjeto);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const updateEstadoObjeto = async (req, res) => {
    try {
        const { estado } = req.body;
        const updatedObjeto = await ObjetosNivel.updateEstado(req.params.id, estado);
        if (!updatedObjeto) {
            return res.status(404).json({ error: 'Objeto no encontrado' });
        }
        res.json(updatedObjeto);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const deleteObjetoNivel = async (req, res) => {
    try {
        const deletedObjeto = await ObjetosNivel.delete(req.params.id);
        if (!deletedObjeto) {
            return res.status(404).json({ error: 'Objeto no encontrado' });
        }
        res.json(deletedObjeto);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};