import express from 'express';
import {
    createDialogo,
    deleteDialogo,
    getAllDialogos,
    getDialogoById,
    getDialogosByNpcId,
    updateDialogo,
    createEntradaDialogo,
    deleteEntradaDialogo,
    getEntradaById,
    getEntradasByDialogoId,
    reorderEntradas,
    updateEntradaDialogo,
    getEventoById,
    createEventoDialogo,
    updateEventoDialogo,
    deleteEventoDialogo,
    getEventosByEntradaId,
    getEventosByOpcionId,
    getOpcionById,
    updateOpcionRespuesta,
    deleteOpcionRespuesta,
    getOpcionesByEntradaId,
    createOpcionRespuesta,
    reorderOpciones,
    getAllVariables,
    getVariableById,
    getVariableByNombre,
    createVariable,
    updateVariable,
    updateVariableByNombre,
    bulkUpdateVariables,
    deleteVariable,
    getHistorialByJugador,
    getHistorialByDialogo,
    createHistorial,
    marcarComoLeido,
    deleteHistorial,
    clearHistorialJugador
} from '../controllers/dialogo-controller.js';

const dialogoRoutes = express.Router();

// Rutas para Diálogos
dialogoRoutes.get('/', getAllDialogos);
dialogoRoutes.get('/:id', getDialogoById);
dialogoRoutes.get('/npc/:npc_id', getDialogosByNpcId);
dialogoRoutes.post('/', createDialogo);
dialogoRoutes.put('/:id', updateDialogo);
dialogoRoutes.delete('/:id', deleteDialogo);

// Rutas para Entradas de Diálogo
dialogoRoutes.get('/:dialogo_id/entradas', getEntradasByDialogoId);
dialogoRoutes.post('/:dialogo_id/entradas', createEntradaDialogo);
dialogoRoutes.put('/:dialogo_id/entradas/orden', reorderEntradas);

// Rutas para Entradas específicas (no necesitan dialogo_id en la URL)
dialogoRoutes.get('/entradas/:id', getEntradaById);
dialogoRoutes.put('/entradas/:id', updateEntradaDialogo);
dialogoRoutes.delete('/entradas/:id', deleteEntradaDialogo);

// Rutas para Opciones de Respuesta
dialogoRoutes.get('/entradas/:entrada_id/opciones', getOpcionesByEntradaId);
dialogoRoutes.post('/entradas/:entrada_id/opciones', createOpcionRespuesta);
dialogoRoutes.put('/entradas/:entrada_id/opciones/orden', reorderOpciones);

// Rutas para Opciones específicas (no necesitan entrada_id en la URL)
dialogoRoutes.get('/opciones/:id', getOpcionById);
dialogoRoutes.put('/opciones/:id', updateOpcionRespuesta);
dialogoRoutes.delete('/opciones/:id', deleteOpcionRespuesta);

// Rutas para Eventos de Diálogo
dialogoRoutes.get('/entradas/:entrada_id/eventos', getEventosByEntradaId);
dialogoRoutes.get('/opciones/:opcion_id/eventos', getEventosByOpcionId);
dialogoRoutes.post('/entradas/:entrada_id/eventos', createEventoDialogo);
dialogoRoutes.post('/opciones/:opcion_id/eventos', createEventoDialogo);

// Rutas para Eventos específicos
dialogoRoutes.get('/eventos/:id', getEventoById);
dialogoRoutes.put('/eventos/:id', updateEventoDialogo);
dialogoRoutes.delete('/eventos/:id', deleteEventoDialogo);

// Rutas para Variables de Diálogo
dialogoRoutes.get('/variables', getAllVariables);
dialogoRoutes.get('/variables/:id', getVariableById);
dialogoRoutes.get('/variables/nombre/:nombre', getVariableByNombre);
dialogoRoutes.post('/variables', createVariable);
dialogoRoutes.put('/variables/:id', updateVariable);
dialogoRoutes.put('/variables/nombre/:nombre', updateVariableByNombre);
dialogoRoutes.put('/variables/bulk', bulkUpdateVariables);
dialogoRoutes.delete('/variables/:id', deleteVariable);

// Rutas para Historial de Diálogos
dialogoRoutes.get('/jugadores/:jugador_id/historial', getHistorialByJugador);
dialogoRoutes.get('/jugadores/:jugador_id/historial/:dialogo_id', getHistorialByDialogo);
dialogoRoutes.post('/jugadores/:jugador_id/historial', createHistorial);
dialogoRoutes.put('/historial/:id/leido', marcarComoLeido);
dialogoRoutes.delete('/historial/:id', deleteHistorial);
dialogoRoutes.delete('/jugadores/:jugador_id/historial', clearHistorialJugador);


export default dialogoRoutes;