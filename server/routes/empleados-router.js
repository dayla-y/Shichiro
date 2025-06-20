import express from 'express';
import { createEmpleado, getAllEmpleados, getEmpleadosById } from '../controllers/empleados-controller.js';

const empleadoRoutes = express.Router();
empleadoRoutes.get('/', getAllEmpleados);
empleadoRoutes.get('/:id', getEmpleadosById);
empleadoRoutes.post('/', createEmpleado);

export default empleadoRoutes;