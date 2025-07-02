import express from 'express';
import { 
    realizarVenta,
    getVentaById
} from '../controllers/realizar-venta-controller.js';

const realizarVentaRoutes = express.Router();

realizarVentaRoutes.post('/', realizarVenta);
realizarVentaRoutes.get('/:id', getVentaById);

export default realizarVentaRoutes;