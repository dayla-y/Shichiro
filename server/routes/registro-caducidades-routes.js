import express from 'express';
import {
    createRegistro,
    deleteRegistro,
    getAllRegistros,
    getRegistroById,
    getRegistrosByMedicamentoId,
    getRegistrosProximosAVencer,
    updateRegistro
} from '../controllers/registro-caducidades-controller.js';

const registroCaducidadesRoutes = express.Router();

registroCaducidadesRoutes.get('/', getAllRegistros);
registroCaducidadesRoutes.get('/:id', getRegistroById);
registroCaducidadesRoutes.post('/', createRegistro);
registroCaducidadesRoutes.put('/:id', updateRegistro);
registroCaducidadesRoutes.delete('/:id', deleteRegistro);

// Rutas adicionales
registroCaducidadesRoutes.get('/medicamento/:medicamento_id', getRegistrosByMedicamentoId);
registroCaducidadesRoutes.get('/proximos-a-vencer', getRegistrosProximosAVencer);

export default registroCaducidadesRoutes;