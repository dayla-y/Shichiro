import express from 'express';
import {
    createVenta,
    deleteVenta,
    getAllVentas,
    getVentaById,
    updateVenta,
    getDetallesByVentaId,
    addDetalleVenta,
    updateDetalleVenta,
    deleteDetalleVenta
} from '../controllers/ventas-controller.js';

const sellsRoutes = express.Router();

// Rutas para ventas
sellsRoutes.get('/', getAllVentas);
sellsRoutes.get('/:id', getVentaById);
sellsRoutes.post('/', createVenta);
sellsRoutes.put('/:id', updateVenta);
sellsRoutes.delete('/:id', deleteVenta);

// Rutas para detalles de venta
sellsRoutes.get('/:venta_id/detalles', getDetallesByVentaId);
sellsRoutes.post('/:venta_id/detalles', addDetalleVenta);
sellsRoutes.put('/detalles/:detalle_id', updateDetalleVenta);
sellsRoutes.delete('/detalles/:detalle_id', deleteDetalleVenta);

export default sellsRoutes;