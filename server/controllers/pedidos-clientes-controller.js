import { Pedidos } from "../models/pedidos.js";

export const getAllClientOrders = async (req, res) => {
    try {
        const pedidos = await Pedidos.getAll();
        res.json(pedidos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getClientOrderById = async (req, res) => {
    try {
        const pedido = await Pedidos.getById(req.params.id);
        if (!pedido) {
            return res.status(404).json({ error: 'Orden no encontrada' });
        }
        res.json(pedido);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createClientOrder = async (req, res) => {
    try {

        if (req.body.posicion_inventario) {
            const existingPedido = await Pedidos.getByPosition(
                req.body.inventario_id,
                req.body.posicion_inventario
            );
            if (existingPedido) {
                return res.status(400).json({ error: 'El pedido ya está hecho.' });
            }
        }

        const newPedido = await Pedidos.create(req.body);
        res.status(201).json(newPedido);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const updateClientOrder = async (req, res) => {
    try {
        const updatedPedido = await Pedidos.update(req.params.id, req.body);
        if (!updatedPedido) {
            return res.status(404).json({ error: 'Pedido no encontrado' });
        }
        res.json(updatedPedido);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const deleteClientOrder = async (req, res) => {
    try {
        const deletedPedido = await Pedidos.delete(req.params.id);
        if (!deletedPedido) {
            return res.status(404).json({ error: 'Pedido no encontrado' });
        }
        res.json(deletedPedido);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};