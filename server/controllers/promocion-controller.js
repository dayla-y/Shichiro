import { Promociones } from "../models/promocion.js";

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
        
        // Obtener también los medicamentos asociados
        const medicamentos = await Promociones.getMedicamentosByPromocionId(req.params.id);
        res.json({ ...promocion, medicamentos });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createPromocion = async (req, res) => {
    try {
        const { fecha_inicio, fecha_fin, porcentaje_descuento, descripcion, medicamentos } = req.body;
        
        if (!medicamentos || !Array.isArray(medicamentos) || medicamentos.length === 0) {
            return res.status(400).json({ error: 'Debe proporcionar al menos un medicamento para la promoción' });
        }
        
        const newPromocion = await Promociones.create({
            fecha_inicio,
            fecha_fin,
            porcentaje_descuento,
            descripcion,
            medicamentos
        });
        
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

export const updateStockPromocion = async (req, res) => {
    try {
        const { promocion_id, medicamento_id, nueva_cantidad } = req.body;
        
        const updated = await Promociones.updateStockPromocion(
            promocion_id || req.params.promocionId,
            medicamento_id || req.params.medicamentoId,
            nueva_cantidad
        );
        
        if (!updated) {
            return res.status(404).json({ error: 'Relación promoción-medicamento no encontrada' });
        }
        
        res.json(updated);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getMedicamentosPromocion = async (req, res) => {
    try {
        const medicamentos = await Promociones.getMedicamentosByPromocionId(req.params.promocionId);
        res.json(medicamentos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};