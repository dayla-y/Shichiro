import express from 'express';
import { createProveedor,
    deleteProveedor,
    getAllProveedores,
    getProveedorById,
    updateProveedor } from '../controllers/proveedores-controller.js';

const proveedorRoutes = express.Router();

proveedorRoutes.get('/', getAllProveedores);
proveedorRoutes.get('/:id', getProveedorById);
proveedorRoutes.post('/', createProveedor);
proveedorRoutes.put('/:id', updateProveedor);
proveedorRoutes.delete('/:id', deleteProveedor);

export default proveedorRoutes;