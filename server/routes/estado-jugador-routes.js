import express from 'express';
import {
    createEstadoJugador,
    deleteEstadoJugador,
    getAllEstadosJugador,
    getEstadoJugadorById,
    getEstadosByJugadorId,
    updateEstadoJugador,
    updateJugadorState
} from '../controllers/estado-jugador-controller.js';

const estadoJugadorRoutes = express.Router();

// Rutas CRUD básicas
estadoJugadorRoutes.get('/', getAllEstadosJugador);
estadoJugadorRoutes.get('/:id', getEstadoJugadorById);
estadoJugadorRoutes.post('/', createEstadoJugador);
estadoJugadorRoutes.put('/:id', updateEstadoJugador);
estadoJugadorRoutes.delete('/:id', deleteEstadoJugador);

// Rutas específicas para estados de jugador
estadoJugadorRoutes.get('/jugador/:jugador_id', getEstadosByJugadorId);
estadoJugadorRoutes.put('/jugador/:jugador_id/state', updateJugadorState);

export default estadoJugadorRoutes;