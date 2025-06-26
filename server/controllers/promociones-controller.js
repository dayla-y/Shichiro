import { Promociones } from "../models/promociones.js";

export const getAllPromociones = async (req, res) => {
    try {
        const promociones = await Promociones.getAll();
        res.json(promociones);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getPromocionById = async (req, res) => {
    try {
        const promocion = await Promociones.getById(req.params.id);
        if (!promocion) {
            return res.status(404).json({ error: 'Promoción no encontrada' });
        }
        res.json(promocion);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createPromocion = async (req, res) => {
    try {
        const newPromocion = await Promociones.create(req.body);
        res.status(201).json(newPromocion);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const updatePromocion = async (req, res) => {
    try {
        const updatedPromocion = await Promociones.update(req.params.id, req.body);
        if (!updatedPromocion) {
            return res.status(404).json({ error: 'Promoción no encontrada' });
        }
        res.json(updatedPromocion);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const deletePromocion = async (req, res) => {
    try {
        const deletedPromocion = await Promociones.delete(req.params.id);
        if (!deletedPromocion) {
            return res.status(404).json({ error: 'Promoción no encontrada' });
        }
        res.json(deletedPromocion);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getMedicamentosPromocion = async (req, res) => {
    try {
        const medicamentos = await Promociones.getMedicamentosByPromocion(req.params.id);
        res.json(medicamentos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const addMedicamentoPromocion = async (req, res) => {
    try {
        const { id } = req.params;
        const medicamentoPromocion = await Promociones.addMedicamentoToPromocion({
            promocion_id: id,
            ...req.body
        });
        res.status(201).json(medicamentoPromocion);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const updateStockPromocion = async (req, res) => {
    try {
        const { id, medicamentoPromocionId } = req.params;
        const updated = await Promociones.updateStockPromocion(medicamentoPromocionId, req.body.stock_actual_promocion);
        if (!updated) {
            return res.status(404).json({ error: 'Medicamento en promoción no encontrado' });
        }
        res.json(updated);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const removeMedicamentoPromocion = async (req, res) => {
    try {
        const { id, medicamentoPromocionId } = req.params;
        const deleted = await Promociones.removeMedicamentoFromPromocion(medicamentoPromocionId);
        if (!deleted) {
            return res.status(404).json({ error: 'Medicamento en promoción no encontrado' });
        }
        res.json(deleted);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};