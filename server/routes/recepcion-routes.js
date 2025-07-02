import express from 'express';
import {
    recibirMedicamentos,
    getAllRecepciones,
    getRecepcionById
} from '../controllers/recepcion-controller.js';

const recepcionRoutes = express.Router();

recepcionRoutes.post('/recibir', recibirMedicamentos);
recepcionRoutes.get('/', getAllRecepciones);
recepcionRoutes.get('/:id', getRecepcionById);

export default recepcionRoutes;