import { Medicamento } from "../models/medicamento.js";

export const getAllMedicamentos = async (req, res) => {
  try {
    const medicamentos = await Medicamento.getAll();
    res.json(medicamentos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getMedicamentoById = async (req, res) => {
  try {
    const medicamento = await Medicamento.getById(req.params.id);
    if (!medicamento) {
      return res.status(404).json({ error: 'Medicamento no encontrado' });
    }
    res.json(medicamento);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createMedicamento = async (req, res) => {
  try {
    const newMedicamento = await Medicamento.create(req.body);
    res.status(201).json(newMedicamento);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

