import { PedidosClientes } from "../models/pedidos-clientes.js";

export const getAllOrders = async (req, res) => {
    try {
        const pedidos = await PedidosClientes.getAll();
        res.json(pedidos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getOrderById = async (req, res) => {
    try {
        const pedido = await PedidosClientes.getById(req.params.id);
        if (!pedido) {
            return res.status(404).json({ error: 'Orden no encontrada' });
        }
        res.json(pedido);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createOrder = async (req, res) => {
    try {

        if (req.body.posicion_inventario) {
            const existingPedido = await PedidosClientes.getByPosition(
                req.body.inventario_id,
                req.body.posicion_inventario
            );
            if (existingPedido) {
                return res.status(400).json({ error: 'El pedido ya está hecho.' });
            }
        }

        const newPedido = await PedidosClientes.create(req.body);
        res.status(201).json(newPedido);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const updateOrder = async (req, res) => {
    try {
        const updatedPedido = await PedidosClientes.update(req.params.id, req.body);
        if (!updatedPedido) {
            return res.status(404).json({ error: 'Pedido no encontrado' });
        }
        res.json(updatedPedido);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const deleteOrder = async (req, res) => {
    try {
        const deletedPedido = await PedidosClientes.delete(req.params.id);
        if (!deletedPedido) {
            return res.status(404).json({ error: 'Pedido no encontrado' });
        }
        res.json(deletedPedido);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};