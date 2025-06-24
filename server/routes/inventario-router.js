import express from 'express';
import {
    createInventario,
    deleteInventario,
    getAllInventarios,
    getInventarioById,
    updateInventario
} from '../controllers/inventario-controller.js';

const inventarioRoutes = express.Router();

inventarioRoutes.get('/', getAllInventarios);
inventarioRoutes.get('/:id', getInventarioById);
inventarioRoutes.post('/', createInventario);
inventarioRoutes.put('/:id', updateInventario);
inventarioRoutes.delete('/:id', deleteInventario);

export default inventarioRoutes;