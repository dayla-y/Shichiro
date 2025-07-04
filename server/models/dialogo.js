import { pool } from "../configs/db.js";

export class Dialogos {
    static async getAll() {
        const { rows } = await pool.query('SELECT * FROM dialogos');
        return rows;
    }

    static async getById(id) {
        const { rows } = await pool.query('SELECT * FROM dialogos WHERE id = $1', [id]);
        return rows[0];
    }

    static async getByNpcId(npc_id) {
        const { rows } = await pool.query('SELECT * FROM dialogos WHERE npc_id = $1 ORDER BY prioridad DESC', [npc_id]);
        return rows;
    }

    static async create({ nombre, descripcion, npc_id, es_interactuable, repite_dialogo, prioridad }) {
        const { rows } = await pool.query(
            'INSERT INTO dialogos (nombre, descripcion, npc_id, es_interactuable, repite_dialogo, prioridad) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [nombre, descripcion, npc_id, es_interactuable, repite_dialogo, prioridad]
        );
        return rows[0];
    }

    static async update(id, { nombre, descripcion, npc_id, es_interactuable, repite_dialogo, prioridad }) {
        const { rows } = await pool.query(
            'UPDATE dialogos SET nombre = $1, descripcion = $2, npc_id = $3, es_interactuable = $4, repite_dialogo = $5, prioridad = $6 WHERE id = $7 RETURNING *',
            [nombre, descripcion, npc_id, es_interactuable, repite_dialogo, prioridad, id]
        );
        return rows[0];
    }

    static async delete(id) {
        // Primero eliminamos las entradas de diálogo asociadas
        await pool.query('DELETE FROM entradas_dialogo WHERE dialogo_id = $1', [id]);
        
        // Luego eliminamos el diálogo
        const { rows } = await pool.query('DELETE FROM dialogos WHERE id = $1 RETURNING *', [id]);
        return rows[0];
    }
}

export class EntradasDialogo {
    static async getByDialogoId(dialogo_id) {
        const { rows } = await pool.query(
            'SELECT * FROM entradas_dialogo WHERE dialogo_id = $1 ORDER BY orden ASC',
            [dialogo_id]
        );
        return rows;
    }

    static async getById(id) {
        const { rows } = await pool.query('SELECT * FROM entradas_dialogo WHERE id = $1', [id]);
        return rows[0];
    }

    static async create({ dialogo_id, texto, orden, personaje, expresion, velocidad_texto, sonido, requiere_condicion, condicion }) {
        const { rows } = await pool.query(
            'INSERT INTO entradas_dialogo (dialogo_id, texto, orden, personaje, expresion, velocidad_texto, sonido, requiere_condicion, condicion) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
            [dialogo_id, texto, orden, personaje, expresion, velocidad_texto, sonido, requiere_condicion, condicion]
        );
        return rows[0];
    }

    static async update(id, { texto, orden, personaje, expresion, velocidad_texto, sonido, requiere_condicion, condicion }) {
        const { rows } = await pool.query(
            'UPDATE entradas_dialogo SET texto = $1, orden = $2, personaje = $3, expresion = $4, velocidad_texto = $5, sonido = $6, requiere_condicion = $7, condicion = $8 WHERE id = $9 RETURNING *',
            [texto, orden, personaje, expresion, velocidad_texto, sonido, requiere_condicion, condicion, id]
        );
        return rows[0];
    }

    static async delete(id) {
        const { rows } = await pool.query('DELETE FROM entradas_dialogo WHERE id = $1 RETURNING *', [id]);
        return rows[0];
    }

    static async reorder(dialogo_id, newOrder) {
        // Iniciar transacción
        const client = await pool.connect();
        try {
            await client.query('BEGIN');
            
            // Actualizar el orden de todas las entradas
            for (const entry of newOrder) {
                await client.query(
                    'UPDATE entradas_dialogo SET orden = $1 WHERE id = $2 AND dialogo_id = $3',
                    [entry.orden, entry.id, dialogo_id]
                );
            }
            
            await client.query('COMMIT');
            return true;
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    }

}

export class OpcionesRespuesta {
    static async getByEntradaDialogoId(entrada_dialogo_id) {
        const { rows } = await pool.query(
            'SELECT * FROM opciones_respuesta WHERE entrada_dialogo_id = $1 ORDER BY orden ASC',
            [entrada_dialogo_id]
        );
        return rows;
    }

    static async getById(id) {
        const { rows } = await pool.query('SELECT * FROM opciones_respuesta WHERE id = $1', [id]);
        return rows[0];
    }

    static async create({
        entrada_dialogo_id,
        texto,
        orden,
        siguiente_entrada_id,
        accion,
        requiere_item,
        item_id,
        cantidad_item,
        visible
    }) {
        const { rows } = await pool.query(
            `INSERT INTO opciones_respuesta (
                entrada_dialogo_id, texto, orden, siguiente_entrada_id, accion,
                requiere_item, item_id, cantidad_item, visible
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
            [
                entrada_dialogo_id, texto, orden, siguiente_entrada_id, accion,
                requiere_item, item_id, cantidad_item, visible
            ]
        );
        return rows[0];
    }

    static async update(id, {
        texto,
        orden,
        siguiente_entrada_id,
        accion,
        requiere_item,
        item_id,
        cantidad_item,
        visible
    }) {
        const { rows } = await pool.query(
            `UPDATE opciones_respuesta SET 
                texto = $1, orden = $2, siguiente_entrada_id = $3, accion = $4,
                requiere_item = $5, item_id = $6, cantidad_item = $7, visible = $8
            WHERE id = $9 RETURNING *`,
            [
                texto, orden, siguiente_entrada_id, accion,
                requiere_item, item_id, cantidad_item, visible, id
            ]
        );
        return rows[0];
    }

    static async delete(id) {
        // Primero eliminamos los eventos asociados
        await pool.query('DELETE FROM eventos_dialogo WHERE opcion_respuesta_id = $1', [id]);
        
        // Luego eliminamos la opción
        const { rows } = await pool.query('DELETE FROM opciones_respuesta WHERE id = $1 RETURNING *', [id]);
        return rows[0];
    }

    static async reorder(entrada_dialogo_id, newOrder) {
        const client = await pool.connect();
        try {
            await client.query('BEGIN');
            
            for (const option of newOrder) {
                await client.query(
                    'UPDATE opciones_respuesta SET orden = $1 WHERE id = $2 AND entrada_dialogo_id = $3',
                    [option.orden, option.id, entrada_dialogo_id]
                );
            }
            
            await client.query('COMMIT');
            return true;
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    }
}

export class EventosDialogo {
    static async getByEntradaDialogoId(entrada_dialogo_id) {
        const { rows } = await pool.query(
            'SELECT * FROM eventos_dialogo WHERE entrada_dialogo_id = $1',
            [entrada_dialogo_id]
        );
        return rows;
    }

    static async getByOpcionRespuestaId(opcion_respuesta_id) {
        const { rows } = await pool.query(
            'SELECT * FROM eventos_dialogo WHERE opcion_respuesta_id = $1',
            [opcion_respuesta_id]
        );
        return rows;
    }

    static async getById(id) {
        const { rows } = await pool.query('SELECT * FROM eventos_dialogo WHERE id = $1', [id]);
        return rows[0];
    }

    static async create({
        entrada_dialogo_id,
        opcion_respuesta_id,
        tipo_evento,
        parametros,
        delay_ejecucion
    }) {
        const { rows } = await pool.query(
            `INSERT INTO eventos_dialogo (
                entrada_dialogo_id, opcion_respuesta_id, tipo_evento, parametros, delay_ejecucion
            ) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [entrada_dialogo_id, opcion_respuesta_id, tipo_evento, parametros, delay_ejecucion]
        );
        return rows[0];
    }

    static async update(id, {
        tipo_evento,
        parametros,
        delay_ejecucion
    }) {
        const { rows } = await pool.query(
            `UPDATE eventos_dialogo SET 
                tipo_evento = $1, parametros = $2, delay_ejecucion = $3
            WHERE id = $4 RETURNING *`,
            [tipo_evento, parametros, delay_ejecucion, id]
        );
        return rows[0];
    }

    static async delete(id) {
        const { rows } = await pool.query('DELETE FROM eventos_dialogo WHERE id = $1 RETURNING *', [id]);
        return rows[0];
    }
}

export class VariablesDialogo {
    static async getAll() {
        const { rows } = await pool.query('SELECT * FROM variables_dialogo');
        return rows;
    }

    static async getById(id) {
        const { rows } = await pool.query('SELECT * FROM variables_dialogo WHERE id = $1', [id]);
        return rows[0];
    }

    static async getByNombre(nombre) {
        const { rows } = await pool.query('SELECT * FROM variables_dialogo WHERE nombre = $1', [nombre]);
        return rows[0];
    }

    static async create({ nombre, valor, tipo, descripcion }) {
        const { rows } = await pool.query(
            'INSERT INTO variables_dialogo (nombre, valor, tipo, descripcion) VALUES ($1, $2, $3, $4) RETURNING *',
            [nombre, valor, tipo, descripcion]
        );
        return rows[0];
    }

    static async update(id, { nombre, valor, tipo, descripcion }) {
        const { rows } = await pool.query(
            'UPDATE variables_dialogo SET nombre = $1, valor = $2, tipo = $3, descripcion = $4 WHERE id = $5 RETURNING *',
            [nombre, valor, tipo, descripcion, id]
        );
        return rows[0];
    }

    static async updateByNombre(nombre, { valor }) {
        const { rows } = await pool.query(
            'UPDATE variables_dialogo SET valor = $1 WHERE nombre = $2 RETURNING *',
            [valor, nombre]
        );
        return rows[0];
    }

    static async delete(id) {
        const { rows } = await pool.query('DELETE FROM variables_dialogo WHERE id = $1 RETURNING *', [id]);
        return rows[0];
    }

    static async bulkUpdate(variables) {
        const client = await pool.connect();
        try {
            await client.query('BEGIN');
            
            for (const variable of variables) {
                await client.query(
                    'UPDATE variables_dialogo SET valor = $1 WHERE nombre = $2',
                    [variable.valor, variable.nombre]
                );
            }
            
            await client.query('COMMIT');
            return true;
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    }
}

export class HistorialDialogos {
    static async getByJugadorId(jugador_id) {
        const { rows } = await pool.query(
            'SELECT * FROM historial_dialogos WHERE jugador_id = $1 ORDER BY fecha DESC',
            [jugador_id]
        );
        return rows;
    }

    static async getByDialogoId(jugador_id, dialogo_id) {
        const { rows } = await pool.query(
            'SELECT * FROM historial_dialogos WHERE jugador_id = $1 AND dialogo_id = $2 ORDER BY fecha DESC',
            [jugador_id, dialogo_id]
        );
        return rows;
    }

    static async getById(id) {
        const { rows } = await pool.query('SELECT * FROM historial_dialogos WHERE id = $1', [id]);
        return rows[0];
    }

    static async create({
        jugador_id,
        dialogo_id,
        entrada_dialogo_id,
        opcion_seleccionada_id,
        leido
    }) {
        const { rows } = await pool.query(
            `INSERT INTO historial_dialogos (
                jugador_id, dialogo_id, entrada_dialogo_id, opcion_seleccionada_id, leido
            ) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [jugador_id, dialogo_id, entrada_dialogo_id, opcion_seleccionada_id, leido]
        );
        return rows[0];
    }

    static async marcarComoLeido(id) {
        const { rows } = await pool.query(
            'UPDATE historial_dialogos SET leido = TRUE WHERE id = $1 RETURNING *',
            [id]
        );
        return rows[0];
    }

    static async delete(id) {
        const { rows } = await pool.query('DELETE FROM historial_dialogos WHERE id = $1 RETURNING *', [id]);
        return rows[0];
    }

    static async deleteByJugador(jugador_id) {
        const { rows } = await pool.query(
            'DELETE FROM historial_dialogos WHERE jugador_id = $1 RETURNING *',
            [jugador_id]
        );
        return rows;
    }
}