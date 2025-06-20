import { Empleados } from "../models/empleados.js";

export const getAllEmpleados = async (req, res) => {
  try {
    const empleados = await Empleados.getAll();
    res.json(empleados);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getEmpleadosById = async (req, res) => {
  try {
    const empleado = await Empleados.getById(req.params.id);
    if (!empleado) {
      return res.status(404).json({ error: 'Emplado no encontrado' });
    }
    res.json(empleado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createEmpleado = async (req, res) => {
  try {
    const newEmpleado = await Empleados.create(req.body);
    res.status(201).json(newEmpleado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

