import express from 'express';
import {
    createPromocion,
    deletePromocion,
    getAllPromociones,
    getPromocionById,
    updatePromocion,
    updateStockPromocion,
    getMedicamentosPromocion
} from '../controllers/promocion-controller.js';

const promocionRoutes = express.Router();

promocionRoutes.get('/', getAllPromociones);
promocionRoutes.get('/:id', getPromocionById);
promocionRoutes.post('/', createPromocion);
promocionRoutes.put('/:id', updatePromocion);
promocionRoutes.delete('/:id', deletePromocion);

// Rutas específicas para los medicamentos en promociones
promocionRoutes.get('/:promocionId/medicamentos', getMedicamentosPromocion);
promocionRoutes.put('/:promocionId/medicamentos/:medicamentoId', updateStockPromocion);

export default promocionRoutes;