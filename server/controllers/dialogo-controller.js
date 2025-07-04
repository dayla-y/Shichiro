import { Dialogos, EntradasDialogo } from "../models/dialogo.js";

// Controladores para Diálogos
export const getAllDialogos = async (req, res) => {
    try {
        const dialogos = await Dialogos.getAll();
        res.json(dialogos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getDialogoById = async (req, res) => {
    try {
        const dialogo = await Dialogos.getById(req.params.id);
        if (!dialogo) {
            return res.status(404).json({ error: 'Diálogo no encontrado' });
        }
        res.json(dialogo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getDialogosByNpcId = async (req, res) => {
    try {
        const dialogos = await Dialogos.getByNpcId(req.params.npc_id);
        res.json(dialogos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createDialogo = async (req, res) => {
    try {
        const newDialogo = await Dialogos.create(req.body);
        res.status(201).json(newDialogo);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const updateDialogo = async (req, res) => {
    try {
        const updatedDialogo = await Dialogos.update(req.params.id, req.body);
        if (!updatedDialogo) {
            return res.status(404).json({ error: 'Diálogo no encontrado' });
        }
        res.json(updatedDialogo);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const deleteDialogo = async (req, res) => {
    try {
        const deletedDialogo = await Dialogos.delete(req.params.id);
        if (!deletedDialogo) {
            return res.status(404).json({ error: 'Diálogo no encontrado' });
        }
        res.json(deletedDialogo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controladores para Entradas de Diálogo
export const getEntradasByDialogoId = async (req, res) => {
    try {
        const entradas = await EntradasDialogo.getByDialogoId(req.params.dialogo_id);
        res.json(entradas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getEntradaById = async (req, res) => {
    try {
        const entrada = await EntradasDialogo.getById(req.params.id);
        if (!entrada) {
            return res.status(404).json({ error: 'Entrada de diálogo no encontrada' });
        }
        res.json(entrada);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createEntradaDialogo = async (req, res) => {
    try {
        const newEntrada = await EntradasDialogo.create({
            dialogo_id: req.params.dialogo_id,
            ...req.body
        });
        res.status(201).json(newEntrada);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const updateEntradaDialogo = async (req, res) => {
    try {
        const updatedEntrada = await EntradasDialogo.update(req.params.id, req.body);
        if (!updatedEntrada) {
            return res.status(404).json({ error: 'Entrada de diálogo no encontrada' });
        }
        res.json(updatedEntrada);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const deleteEntradaDialogo = async (req, res) => {
    try {
        const deletedEntrada = await EntradasDialogo.delete(req.params.id);
        if (!deletedEntrada) {
            return res.status(404).json({ error: 'Entrada de diálogo no encontrada' });
        }
        res.json(deletedEntrada);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const reorderEntradas = async (req, res) => {
    try {
        const success = await EntradasDialogo.reorder(req.params.dialogo_id, req.body);
        if (!success) {
            return res.status(400).json({ error: 'No se pudo reordenar las entradas' });
        }
        res.json({ success: true });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Controladores para Opciones de Respuesta
export const getOpcionesByEntradaId = async (req, res) => {
    try {
        const opciones = await OpcionesRespuesta.getByEntradaDialogoId(req.params.entrada_id);
        res.json(opciones);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getOpcionById = async (req, res) => {
    try {
        const opcion = await OpcionesRespuesta.getById(req.params.id);
        if (!opcion) {
            return res.status(404).json({ error: 'Opción de respuesta no encontrada' });
        }
        res.json(opcion);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createOpcionRespuesta = async (req, res) => {
    try {
        const newOpcion = await OpcionesRespuesta.create({
            entrada_dialogo_id: req.params.entrada_id,
            ...req.body
        });
        res.status(201).json(newOpcion);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const updateOpcionRespuesta = async (req, res) => {
    try {
        const updatedOpcion = await OpcionesRespuesta.update(req.params.id, req.body);
        if (!updatedOpcion) {
            return res.status(404).json({ error: 'Opción de respuesta no encontrada' });
        }
        res.json(updatedOpcion);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const deleteOpcionRespuesta = async (req, res) => {
    try {
        const deletedOpcion = await OpcionesRespuesta.delete(req.params.id);
        if (!deletedOpcion) {
            return res.status(404).json({ error: 'Opción de respuesta no encontrada' });
        }
        res.json(deletedOpcion);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const reorderOpciones = async (req, res) => {
    try {
        const success = await OpcionesRespuesta.reorder(req.params.entrada_id, req.body);
        if (!success) {
            return res.status(400).json({ error: 'No se pudo reordenar las opciones' });
        }
        res.json({ success: true });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Controladores para Eventos de Diálogo
export const getEventosByEntradaId = async (req, res) => {
    try {
        const eventos = await EventosDialogo.getByEntradaDialogoId(req.params.entrada_id);
        res.json(eventos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getEventosByOpcionId = async (req, res) => {
    try {
        const eventos = await EventosDialogo.getByOpcionRespuestaId(req.params.opcion_id);
        res.json(eventos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getEventoById = async (req, res) => {
    try {
        const evento = await EventosDialogo.getById(req.params.id);
        if (!evento) {
            return res.status(404).json({ error: 'Evento de diálogo no encontrado' });
        }
        res.json(evento);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createEventoDialogo = async (req, res) => {
    try {
        const newEvento = await EventosDialogo.create({
            entrada_dialogo_id: req.params.entrada_id,
            opcion_respuesta_id: req.params.opcion_id || null,
            ...req.body
        });
        res.status(201).json(newEvento);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const updateEventoDialogo = async (req, res) => {
    try {
        const updatedEvento = await EventosDialogo.update(req.params.id, req.body);
        if (!updatedEvento) {
            return res.status(404).json({ error: 'Evento de diálogo no encontrado' });
        }
        res.json(updatedEvento);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const deleteEventoDialogo = async (req, res) => {
    try {
        const deletedEvento = await EventosDialogo.delete(req.params.id);
        if (!deletedEvento) {
            return res.status(404).json({ error: 'Evento de diálogo no encontrado' });
        }
        res.json(deletedEvento);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controladores para Variables de Diálogo
export const getAllVariables = async (req, res) => {
    try {
        const variables = await VariablesDialogo.getAll();
        res.json(variables);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getVariableById = async (req, res) => {
    try {
        const variable = await VariablesDialogo.getById(req.params.id);
        if (!variable) {
            return res.status(404).json({ error: 'Variable no encontrada' });
        }
        res.json(variable);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getVariableByNombre = async (req, res) => {
    try {
        const variable = await VariablesDialogo.getByNombre(req.params.nombre);
        if (!variable) {
            return res.status(404).json({ error: 'Variable no encontrada' });
        }
        res.json(variable);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createVariable = async (req, res) => {
    try {
        const newVariable = await VariablesDialogo.create(req.body);
        res.status(201).json(newVariable);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const updateVariable = async (req, res) => {
    try {
        const updatedVariable = await VariablesDialogo.update(req.params.id, req.body);
        if (!updatedVariable) {
            return res.status(404).json({ error: 'Variable no encontrada' });
        }
        res.json(updatedVariable);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const updateVariableByNombre = async (req, res) => {
    try {
        const updatedVariable = await VariablesDialogo.updateByNombre(
            req.params.nombre, 
            req.body
        );
        if (!updatedVariable) {
            return res.status(404).json({ error: 'Variable no encontrada' });
        }
        res.json(updatedVariable);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const bulkUpdateVariables = async (req, res) => {
    try {
        const success = await VariablesDialogo.bulkUpdate(req.body);
        res.json({ success });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const deleteVariable = async (req, res) => {
    try {
        const deletedVariable = await VariablesDialogo.delete(req.params.id);
        if (!deletedVariable) {
            return res.status(404).json({ error: 'Variable no encontrada' });
        }
        res.json(deletedVariable);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controladores para Historial de Diálogos
export const getHistorialByJugador = async (req, res) => {
    try {
        const historial = await HistorialDialogos.getByJugadorId(req.params.jugador_id);
        res.json(historial);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getHistorialByDialogo = async (req, res) => {
    try {
        const historial = await HistorialDialogos.getByDialogoId(
            req.params.jugador_id,
            req.params.dialogo_id
        );
        res.json(historial);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getHistorialById = async (req, res) => {
    try {
        const registro = await HistorialDialogos.getById(req.params.id);
        if (!registro) {
            return res.status(404).json({ error: 'Registro de historial no encontrado' });
        }
        res.json(registro);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createHistorial = async (req, res) => {
    try {
        const newRegistro = await HistorialDialogos.create({
            jugador_id: req.params.jugador_id,
            ...req.body
        });
        res.status(201).json(newRegistro);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const marcarComoLeido = async (req, res) => {
    try {
        const registro = await HistorialDialogos.marcarComoLeido(req.params.id);
        if (!registro) {
            return res.status(404).json({ error: 'Registro de historial no encontrado' });
        }
        res.json(registro);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const deleteHistorial = async (req, res) => {
    try {
        const deletedRegistro = await HistorialDialogos.delete(req.params.id);
        if (!deletedRegistro) {
            return res.status(404).json({ error: 'Registro de historial no encontrado' });
        }
        res.json(deletedRegistro);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const clearHistorialJugador = async (req, res) => {
    try {
        const deleted = await HistorialDialogos.deleteByJugador(req.params.jugador_id);
        res.json({ deleted: deleted.length });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};