import express from 'express';
import {
    createNPC,
    deleteNPC,
    getAllNPCs,
    getNPCById,
    updateNPC,
    getNPCsByEscena,
    getNPCsByTipo,
    updateNPCPosicion,
    updateNPCEstado
} from '../controllers/npc-controller.js';

const npcRoutes = express.Router();

// Rutas CRUD básicas
npcRoutes.get('/', getAllNPCs);
npcRoutes.get('/:id', getNPCById);
npcRoutes.post('/', createNPC);
npcRoutes.put('/:id', updateNPC);
npcRoutes.delete('/:id', deleteNPC);

// Rutas adicionales específicas para NPCs
npcRoutes.get('/escena/:escena', getNPCsByEscena);
npcRoutes.get('/tipo/:tipo', getNPCsByTipo);
npcRoutes.patch('/:id/posicion', updateNPCPosicion);
npcRoutes.patch('/:id/estado', updateNPCEstado);

export default npcRoutes;