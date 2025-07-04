import express from 'express';
import {
    createInteraccion,
    deleteInteraccion,
    getAllInteracciones,
    getInteraccionById,
    getInteraccionesByJugadorId,
    getInteraccionesByObjetoId,
    updateInteraccion
} from '../controllers/interaccion-controller.js';

const interaccionRoutes = express.Router();

interaccionRoutes.get('/', getAllInteracciones);
interaccionRoutes.get('/:id', getInteraccionById);
interaccionRoutes.get('/jugador/:jugador_id', getInteraccionesByJugadorId);
interaccionRoutes.get('/objeto/:objeto_id', getInteraccionesByObjetoId);
interaccionRoutes.post('/', createInteraccion);
interaccionRoutes.put('/:id', updateInteraccion);
interaccionRoutes.delete('/:id', deleteInteraccion);

export default interaccionRoutes;