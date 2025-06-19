import express from 'express';
import { getAllMedicamentos, getMedicamentoById, createMedicamento } from'../controllers/medicamento-controller.js';

const medicamentoRoutes = express.Router();
medicamentoRoutes.get('/', getAllMedicamentos);
medicamentoRoutes.get('/:id', getMedicamentoById);
medicamentoRoutes.post('/', createMedicamento);

export default medicamentoRoutes;