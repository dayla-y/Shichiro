import express from 'express';
import {
    calcularComision,
    getHistorialComisiones
} from '../controllers/comisionController.js';

const comisionRoutes = express.Router();

comisionRoutes.post('/calcular', calcularComision);
comisionRoutes.get('/historial/:empleadoId', getHistorialComisiones);

export default comisionRoutes;