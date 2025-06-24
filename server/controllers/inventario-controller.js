import { Inventarios } from "../models/inventario.js";

export const getAllInventarios = async (req, res) => {
    try {
        const inventarios = await Inventarios.getAll();
        res.json(inventarios);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getInventarioById = async (req, res) => {
    try {
        const inventario = await Inventarios.getById(req.params.id);
        if (!inventario) {
            return res.status(404).json({ error: 'Inventario no encontrado' });
        }
        res.json(inventario);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createInventario = async (req, res) => {
    try {
        const newInventario = await Inventarios.create(req.body);
        res.status(201).json(newInventario);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const updateInventario = async (req, res) => {
    try {
        const updatedInventario = await Inventarios.update(req.params.id, req.body);
        if (!updatedInventario) {
            return res.status(404).json({ error: 'Inventario no encontrado' });
        }
        res.json(updatedInventario);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const deleteInventario = async (req, res) => {
    try {
        const deletedInventario = await Inventarios.delete(req.params.id);
        if (!deletedInventario) {
            return res.status(404).json({ error: 'Inventario no encontrado' });
        }
        res.json(deletedInventario);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};