import express from 'express';
import { createWarehouse, getAllWarehouses, getWarehousesById } from '../controllers/almacenes-controller.js';

const warehousesRoutes = express.Router();
warehousesRoutes.get('/', getAllWarehouses);
warehousesRoutes.get('/:id', getWarehousesById);
warehousesRoutes.post('/', createWarehouse);

export default warehousesRoutes;