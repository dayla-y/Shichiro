import express from 'express';
import {
    createJugador,
    deleteJugador,
    getAllJugadores,
    getJugadorById,
    updateJugador,
    updateJugadorPosition,
    updateJugadorHealth,
    updateJugadorState
} from '../controllers/jugador-controller.js';

const jugadorRoutes = express.Router();

// Rutas CRUD básicas
jugadorRoutes.get('/', getAllJugadores);
jugadorRoutes.get('/:id', getJugadorById);
jugadorRoutes.post('/', createJugador);
jugadorRoutes.put('/:id', updateJugador);
jugadorRoutes.delete('/:id', deleteJugador);

// Rutas específicas para jugadores
jugadorRoutes.put('/:id/position', updateJugadorPosition);
jugadorRoutes.put('/:id/health', updateJugadorHealth);
jugadorRoutes.put('/:id/state', updateJugadorState);

export default jugadorRoutes;