import express from 'express';
import { createSell, getAllSells, getSellsById } from '../controllers/ventas-controller.js';

const sellsRoutes = express.Router();
sellsRoutes.get('/', getAllSells);
sellsRoutes.get('/:id', getSellsById);
sellsRoutes.post('/', createSell);

export default sellsRoutes;