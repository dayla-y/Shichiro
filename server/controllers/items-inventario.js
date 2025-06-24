import { ItemsInventario } from "../models/items-inventario.js";

export const getAllItems = async (req, res) => {
    try {
        const items = await ItemsInventario.getAll();
        res.json(items);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getItemsByInventario = async (req, res) => {
    try {
        const items = await ItemsInventario.getByInventarioId(req.params.inventario_id);
        res.json(items);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getItemById = async (req, res) => {
    try {
        const item = await ItemsInventario.getById(req.params.id);
        if (!item) {
            return res.status(404).json({ error: 'Ítem no encontrado' });
        }
        res.json(item);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createItem = async (req, res) => {
    try {

        if (req.body.posicion_inventario) {
            const existingItem = await ItemsInventario.getByPosition(
                req.body.inventario_id,
                req.body.posicion_inventario
            );
            if (existingItem) {
                return res.status(400).json({ error: 'La posición en el inventario ya está ocupada' });
            }
        }

        const newItem = await ItemsInventario.create(req.body);
        res.status(201).json(newItem);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const updateItem = async (req, res) => {
    try {
        const updatedItem = await ItemsInventario.update(req.params.id, req.body);
        if (!updatedItem) {
            return res.status(404).json({ error: 'Ítem no encontrado' });
        }
        res.json(updatedItem);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const deleteItem = async (req, res) => {
    try {
        const deletedItem = await ItemsInventario.delete(req.params.id);
        if (!deletedItem) {
            return res.status(404).json({ error: 'Ítem no encontrado' });
        }
        res.json(deletedItem);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};