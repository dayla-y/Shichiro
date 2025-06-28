import { Proveedores } from "../models/proveedores.js";

export const getAllProveedores = async (req, res) => {
    try {
        const proveedores = await Proveedores.getAll();
        res.json(proveedores);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getProveedorById = async (req, res) => {
    try {
        const proveedor = await Proveedores.getById(req.params.id);
        if (!proveedor) {
            return res.status(404).json({ error: 'Proveedor no encontrado' });
        }
        res.json(proveedor);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createProveedor = async (req, res) => {
    try {
        // Validar campos obligatorios
        if (!req.body.nombre || req.body.acepta_devoluciones === undefined) {
            return res.status(400).json({ error: 'Nombre y acepta_devoluciones son campos obligatorios' });
        }
        
        const newProveedor = await Proveedores.create(req.body);
        res.status(201).json(newProveedor);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const updateProveedor = async (req, res) => {
    try {
        const updatedProveedor = await Proveedores.update(req.params.id, req.body);
        if (!updatedProveedor) {
            return res.status(404).json({ error: 'Proveedor no encontrado' });
        }
        res.json(updatedProveedor);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const deleteProveedor = async (req, res) => {
    try {
        const deletedProveedor = await Proveedores.delete(req.params.id);
        if (!deletedProveedor) {
            return res.status(404).json({ error: 'Proveedor no encontrado' });
        }
        res.json(deletedProveedor);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};