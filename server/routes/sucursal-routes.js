import express from 'express';
import {
    createSucursal,
    deleteSucursal,
    getAllSucursales,
    getSucursalById,
    updateSucursal,
    getSucursalesPrincipales
} from '../controllers/sucursal-controller.js';

const sucursalRoutes = express.Router();

sucursalRoutes.get('/', getAllSucursales);
sucursalRoutes.get('/principales', getSucursalesPrincipales);
sucursalRoutes.get('/:id', getSucursalById);
sucursalRoutes.post('/', createSucursal);
sucursalRoutes.put('/:id', updateSucursal);
sucursalRoutes.delete('/:id', deleteSucursal);

export default sucursalRoutes;