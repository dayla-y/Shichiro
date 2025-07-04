import express from 'express';
import {
    createPartida,
    deletePartida,
    getLatestPartidaByPlayer,
    getPartidaById,
    getPartidasByPlayer,
    updatePartida
} from '../controllers/partidaGuardada-controller.js';

const partidaGuardadaRoutes = express.Router();

// Obtener todas las partidas de un jugador
partidaGuardadaRoutes.get('/jugador/:jugador_id', getPartidasByPlayer);

// Obtener la última partida guardada de un jugador
partidaGuardadaRoutes.get('/jugador/:jugador_id/ultima', getLatestPartidaByPlayer);

// Obtener una partida por ID
partidaGuardadaRoutes.get('/:id', getPartidaById);

// Crear una nueva partida guardada
partidaGuardadaRoutes.post('/', createPartida);

// Actualizar una partida guardada
partidaGuardadaRoutes.put('/:id', updatePartida);

// Eliminar una partida guardada
partidaGuardadaRoutes.delete('/:id', deletePartida);

export default partidaGuardadaRoutes;