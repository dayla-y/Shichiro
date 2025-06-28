import { Sucursales } from "../models/sucursal.js";

export const getAllSucursales = async (req, res) => {
    try {
        const sucursales = await Sucursales.getAll();
        res.json(sucursales);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getSucursalById = async (req, res) => {
    try {
        const sucursal = await Sucursales.getById(req.params.id);
        if (!sucursal) {
            return res.status(404).json({ error: 'Sucursal no encontrada' });
        }
        res.json(sucursal);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createSucursal = async (req, res) => {
    try {
        // Validación básica
        if (!req.body.nombre || !req.body.direccion) {
            return res.status(400).json({ error: 'Nombre y dirección son campos requeridos' });
        }

        const newSucursal = await Sucursales.create(req.body);
        res.status(201).json(newSucursal);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const updateSucursal = async (req, res) => {
    try {
        const updatedSucursal = await Sucursales.update(req.params.id, req.body);
        if (!updatedSucursal) {
            return res.status(404).json({ error: 'Sucursal no encontrada' });
        }
        res.json(updatedSucursal);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const deleteSucursal = async (req, res) => {
    try {
        const deletedSucursal = await Sucursales.delete(req.params.id);
        if (!deletedSucursal) {
            return res.status(404).json({ error: 'Sucursal no encontrada' });
        }
        res.json({ message: 'Sucursal marcada como inactiva', sucursal: deletedSucursal });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getSucursalesPrincipales = async (req, res) => {
    try {
        const sucursales = await Sucursales.getPrincipales();
        res.json(sucursales);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};