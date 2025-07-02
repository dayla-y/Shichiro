import { InventarioJugador } from "../models/inventario.js";

export const getInventarioByJugador = async (req, res) => {
    try {
        const inventario = await InventarioJugador.getByJugadorId(req.params.jugador_id);
        if (!inventario) {
            return res.status(404).json({ error: 'Inventario no encontrado' });
        }
        
        const items = await InventarioJugador.getItems(inventario.id);
        res.json({ ...inventario, items });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createInventario = async (req, res) => {
    try {
        const { jugador_id, capacidad_maxima } = req.body;
        const newInventario = await InventarioJugador.create({ jugador_id, capacidad_maxima });
        res.status(201).json(newInventario);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const updateCapacidadInventario = async (req, res) => {
    try {
        const updatedInventario = await InventarioJugador.updateCapacidad(
            req.params.id, 
            req.body.capacidad_maxima
        );
        if (!updatedInventario) {
            return res.status(404).json({ error: 'Inventario no encontrado' });
        }
        res.json(updatedInventario);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const addItemToInventario = async (req, res) => {
    try {
        const newItem = await InventarioJugador.addItem(
            req.params.inventario_id,
            req.body
        );
        res.status(201).json(newItem);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const removeItemFromInventario = async (req, res) => {
    try {
        const success = await InventarioJugador.removeItem(
            req.params.item_id,
            req.params.inventario_id
        );
        if (!success) {
            return res.status(404).json({ error: 'Item no encontrado' });
        }
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateItemInInventario = async (req, res) => {
    try {
        const updatedItem = await InventarioJugador.updateItem(
            req.params.item_id,
            req.body
        );
        if (!updatedItem) {
            return res.status(404).json({ error: 'Item no encontrado' });
        }
        res.json(updatedItem);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};