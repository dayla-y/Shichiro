import express from 'express';
import {
    getAllReportes,
    getReporteById,
    verificarCaducidades,
    deleteReporte
} from '../controllers/reporteCaducidades-controller.js';

const reporteCaducidadesRouter = express.Router();

reporteCaducidadesRouter.get('/', getAllReportes);
reporteCaducidadesRouter.get('/verificar', verificarCaducidades);
reporteCaducidadesRouter.get('/:id', getReporteById);
reporteCaducidadesRouter.delete('/:id', deleteReporte);

export default reporteCaducidadesRouter;