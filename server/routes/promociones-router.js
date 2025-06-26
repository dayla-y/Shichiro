import express from 'express';
import {
    getAllPromociones,
    getPromocionById,
    createPromocion,
    updatePromocion,
    deletePromocion,
    getMedicamentosPromocion,
    addMedicamentoPromocion,
    updateStockPromocion,
    removeMedicamentoPromocion
} from '../controllers/promociones-controller.js';

const promotionsRouter = express.Router();

promotionsRouter.get('/', getAllPromociones);
promotionsRouter.get('/:id', getPromocionById);
promotionsRouter.post('/', createPromocion);
promotionsRouter.put('/:id', updatePromocion);
promotionsRouter.delete('/:id', deletePromocion);

// Rutas para medicamentos en promoción
promotionsRouter.get('/:id/medicamentos', getMedicamentosPromocion);
promotionsRouter.post('/:id/medicamentos', addMedicamentoPromocion);
promotionsRouter.put('/:id/medicamentos/:medicamentoPromocionId', updateStockPromocion);
promotionsRouter.delete('/:id/medicamentos/:medicamentoPromocionId', removeMedicamentoPromocion);

export default promotionsRouter;