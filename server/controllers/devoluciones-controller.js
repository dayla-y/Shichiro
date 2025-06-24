import { Devoluciones } from "../models/devoluciones.js";

export const getAllDevolutions = async (req, res) => {
  try {
    const devolutions = await Devoluciones.getAll();
    res.json(devolutions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getDevolutionsById = async (req, res) => {
  try {
    const devolutions = await Devoluciones.getById(req.params.id);
    if (!devolutions) {
      return res.status(404).json({ error: 'Devolución no encontrada' });
    }
    res.json(devolutions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createDevolution = async (req, res) => {
  try {
    const newDevolution = await Devoluciones.create(req.body);
    res.status(201).json(newDevolution);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

