import express from 'express';
import {
    getAllRecepciones,
    getRecepcionById,
    createRecepcion,
    updateRecepcion,
    deleteRecepcion,
    validateRecepcion,
    getDetallesRecepcion,
    addDetalleRecepcion,
    updateDetalleRecepcion,
    removeDetalleRecepcion
} from '../controllers/recepciones-controller.js';

const receptionsRouter = express.Router();

receptionsRouter.get('/', getAllRecepciones);
receptionsRouter.get('/:id', getRecepcionById);
receptionsRouter.post('/', createRecepcion);
receptionsRouter.put('/:id', updateRecepcion);
receptionsRouter.delete('/:id', deleteRecepcion);
receptionsRouter.post('/:id/validate', validateRecepcion);

// Rutas para detalles de recepción
receptionsRouter.get('/:id/detalles', getDetallesRecepcion);
receptionsRouter.post('/:id/detalles', addDetalleRecepcion);
receptionsRouter.put('/:id/detalles/:detalleId', updateDetalleRecepcion);
receptionsRouter.delete('/:id/detalles/:detalleId', removeDetalleRecepcion);

export default receptionsRouter;