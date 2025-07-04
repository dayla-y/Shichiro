import express from 'express';
import {
    createEscena,
    deleteEscena,
    getAllEscenas,
    getEscenaById,
    getEscenaByNombre,
    updateEscena
} from '../controllers/escena-controller.js';

const escenaRoutes = express.Router();

escenaRoutes.get('/', getAllEscenas);
escenaRoutes.get('/:id', getEscenaById);
escenaRoutes.get('/nombre/:nombre', getEscenaByNombre);
escenaRoutes.post('/', createEscena);
escenaRoutes.put('/:id', updateEscena);
escenaRoutes.delete('/:id', deleteEscena);

export default escenaRoutes;