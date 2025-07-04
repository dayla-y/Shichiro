import { Animaciones } from "../models/animacion.js";

export const getAllAnimaciones = async (req, res) => {
    try {
        const animaciones = await Animaciones.getAll();
        res.json(animaciones);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getAnimacionById = async (req, res) => {
    try {
        const animacion = await Animaciones.getById(req.params.id);
        if (!animacion) {
            return res.status(404).json({ error: 'Animación no encontrada' });
        }
        res.json(animacion);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createAnimacion = async (req, res) => {
    try {
        // Validar que el tipo de entidad sea uno de los permitidos
        const tiposPermitidos = ['jugador', 'npc', 'objeto'];
        if (!tiposPermitidos.includes(req.body.entidad_tipo)) {
            return res.status(400).json({ error: 'Tipo de entidad no válido' });
        }

        // Validar que frames sea un JSON válido
        try {
            JSON.parse(req.body.frames);
        } catch (e) {
            return res.status(400).json({ error: 'El campo frames debe ser un JSON válido' });
        }

        const newAnimacion = await Animaciones.create(req.body);
        res.status(201).json(newAnimacion);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const updateAnimacion = async (req, res) => {
    try {
        // Validaciones similares a create
        if (req.body.entidad_tipo) {
            const tiposPermitidos = ['jugador', 'npc', 'objeto'];
            if (!tiposPermitidos.includes(req.body.entidad_tipo)) {
                return res.status(400).json({ error: 'Tipo de entidad no válido' });
            }
        }

        if (req.body.frames) {
            try {
                JSON.parse(req.body.frames);
            } catch (e) {
                return res.status(400).json({ error: 'El campo frames debe ser un JSON válido' });
            }
        }

        const updatedAnimacion = await Animaciones.update(req.params.id, req.body);
        if (!updatedAnimacion) {
            return res.status(404).json({ error: 'Animación no encontrada' });
        }
        res.json(updatedAnimacion);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const deleteAnimacion = async (req, res) => {
    try {
        const deletedAnimacion = await Animaciones.delete(req.params.id);
        if (!deletedAnimacion) {
            return res.status(404).json({ error: 'Animación no encontrada' });
        }
        res.json(deletedAnimacion);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controladores para los métodos adicionales
export const getAnimacionesByEntity = async (req, res) => {
    try {
        const { entidad_tipo, entidad_id } = req.params;
        const animaciones = await Animaciones.getByEntity(entidad_tipo, entidad_id);
        res.json(animaciones);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getAnimacionesByState = async (req, res) => {
    try {
        const { estado } = req.params;
        const animaciones = await Animaciones.getByState(estado);
        res.json(animaciones);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};