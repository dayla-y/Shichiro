import express from 'express';
import {
  transferirMedicamento,
  getHistorialTransferencias,
  getTransferenciasPorSucursal,
  getTransferenciaById
} from '../controllers/transferencias-controller.js';

const transferenciasRoutes = express.Router();

transferenciasRoutes.post('/transferir', transferirMedicamento);
transferenciasRoutes.get('/historial', getHistorialTransferencias);
transferenciasRoutes.get('/sucursal/:sucursal_id', getTransferenciasPorSucursal);
transferenciasRoutes.get('/:id', getTransferenciaById);

export default transferenciasRoutes;