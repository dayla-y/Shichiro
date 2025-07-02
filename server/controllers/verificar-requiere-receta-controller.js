import { verificar_requiere_receta } from "../models/verificar_requiere_receta.js";

export const verificarReceta = async (req, res) => {
    try {
        const valido = await verificar_requiere_receta.verificarRequiereReceta(req.params.ventaId);
        
        if (!valido) {
            return res.status(400).json({ 
                error: 'La venta contiene medicamentos que requieren receta pero faltan datos del doctor' 
            });
        }
        
        res.json({ valido });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};