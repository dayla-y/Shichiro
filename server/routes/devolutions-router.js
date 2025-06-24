import express from 'express';
import { createDevolution, getAllDevolutions, getDevolutionsById } from '../controllers/devoluciones-controller.js';

const devolutionsRoutes = express.Router();
devolutionsRoutes.get('/', getAllDevolutions);
devolutionsRoutes.get('/:id', getDevolutionsById);
devolutionsRoutes.post('/', createDevolution);

export default devolutionsRoutes;