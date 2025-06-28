import { Ventas } from "../models/ventas.js";

export const getAllVentas = async (req, res) => {
    try {
        const ventas = await Ventas.getAll();
        res.json(ventas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getVentaById = async (req, res) => {
    try {
        const venta = await Ventas.getById(req.params.id);
        if (!venta) {
            return res.status(404).json({ error: 'Venta no encontrada' });
        }
        res.json(venta);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createVenta = async (req, res) => {
    try {
        const newVenta = await Ventas.create(req.body);
        res.status(201).json(newVenta);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const updateVenta = async (req, res) => {
    try {
        const updatedVenta = await Ventas.update(req.params.id, req.body);
        if (!updatedVenta) {
            return res.status(404).json({ error: 'Venta no encontrada' });
        }
        res.json(updatedVenta);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const deleteVenta = async (req, res) => {
    try {
        const deletedVenta = await Ventas.delete(req.params.id);
        if (!deletedVenta) {
            return res.status(404).json({ error: 'Venta no encontrada' });
        }
        res.json(deletedVenta);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controladores para detalles de venta
export const getDetallesByVentaId = async (req, res) => {
    try {
        const detalles = await Ventas.getDetallesByVentaId(req.params.venta_id);
        res.json(detalles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const addDetalleVenta = async (req, res) => {
    try {
        const newDetalle = await Ventas.addDetalleVenta({
            venta_id: req.params.venta_id,
            ...req.body
        });
        res.status(201).json(newDetalle);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const updateDetalleVenta = async (req, res) => {
    try {
        const updatedDetalle = await Ventas.updateDetalleVenta(req.params.detalle_id, req.body);
        if (!updatedDetalle) {
            return res.status(404).json({ error: 'Detalle de venta no encontrado' });
        }
        res.json(updatedDetalle);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const deleteDetalleVenta = async (req, res) => {
    try {
        const deletedDetalle = await Ventas.deleteDetalleVenta(req.params.detalle_id);
        if (!deletedDetalle) {
            return res.status(404).json({ error: 'Detalle de venta no encontrado' });
        }
        res.json(deletedDetalle);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};