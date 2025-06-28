import { RegistroCaducidades } from "../models/registroCaducidades.js";

export const getAllRegistros = async (req, res) => {
    try {
        const registros = await RegistroCaducidades.getAll();
        res.json(registros);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getRegistroById = async (req, res) => {
    try {
        const registro = await RegistroCaducidades.getById(req.params.id);
        if (!registro) {
            return res.status(404).json({ error: 'Registro no encontrado' });
        }
        res.json(registro);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createRegistro = async (req, res) => {
    try {
        const newRegistro = await RegistroCaducidades.create(req.body);
        res.status(201).json(newRegistro);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const updateRegistro = async (req, res) => {
    try {
        const updatedRegistro = await RegistroCaducidades.update(req.params.id, req.body);
        if (!updatedRegistro) {
            return res.status(404).json({ error: 'Registro no encontrado' });
        }
        res.json(updatedRegistro);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const deleteRegistro = async (req, res) => {
    try {
        const deletedRegistro = await RegistroCaducidades.delete(req.params.id);
        if (!deletedRegistro) {
            return res.status(404).json({ error: 'Registro no encontrado' });
        }
        res.json(deletedRegistro);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controladores para los métodos adicionales
export const getRegistrosByMedicamentoId = async (req, res) => {
    try {
        const registros = await RegistroCaducidades.getByMedicamentoId(req.params.medicamento_id);
        res.json(registros);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getRegistrosProximosAVencer = async (req, res) => {
    try {
        const dias = req.query.dias || 30; // Valor por defecto: 30 días
        const registros = await RegistroCaducidades.getProximosAVencer(dias);
        res.json(registros);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};