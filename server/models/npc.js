import { pool } from "../configs/db.js";

export class NPCs {
    static async getAll() {
        const { rows } = await pool.query('SELECT * FROM npcs');
        return rows;
    }

    static async getById(id) {
        const { rows } = await pool.query('SELECT * FROM npcs WHERE id = $1', [id]);
        return rows[0];
    }

    static async create({ 
        nombre, 
        tipo, 
        salud_actual, 
        salud_maxima, 
        velocidad_base, 
        posicion_x, 
        posicion_y, 
        direccion, 
        estado_actual, 
        escena_actual, 
        items_venta, 
        comportamiento 
    }) {
        const { rows } = await pool.query(
            `INSERT INTO npcs (
                nombre, tipo, salud_actual, salud_maxima, velocidad_base, 
                posicion_x, posicion_y, direccion, estado_actual, 
                escena_actual, items_venta, comportamiento
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *`,
            [
                nombre, tipo, salud_actual, salud_maxima, velocidad_base, 
                posicion_x, posicion_y, direccion, estado_actual, 
                escena_actual, items_venta, comportamiento
            ]
        );
        return rows[0];
    }

    static async update(id, { 
        nombre, 
        tipo, 
        salud_actual, 
        salud_maxima, 
        velocidad_base, 
        posicion_x, 
        posicion_y, 
        direccion, 
        estado_actual, 
        escena_actual, 
        items_venta, 
        comportamiento 
    }) {
        const { rows } = await pool.query(
            `UPDATE npcs SET 
                nombre = $1, 
                tipo = $2, 
                salud_actual = $3, 
                salud_maxima = $4, 
                velocidad_base = $5, 
                posicion_x = $6, 
                posicion_y = $7, 
                direccion = $8, 
                estado_actual = $9, 
                escena_actual = $10, 
                items_venta = $11, 
                comportamiento = $12 
            WHERE id = $13 RETURNING *`,
            [
                nombre, tipo, salud_actual, salud_maxima, velocidad_base, 
                posicion_x, posicion_y, direccion, estado_actual, 
                escena_actual, items_venta, comportamiento, id
            ]
        );
        return rows[0];
    }

    static async delete(id) {
        const { rows } = await pool.query('DELETE FROM npcs WHERE id = $1 RETURNING *', [id]);
        return rows[0];
    }

    // Métodos adicionales específicos para NPCs
    static async getByEscena(escena_actual) {
        const { rows } = await pool.query('SELECT * FROM npcs WHERE escena_actual = $1', [escena_actual]);
        return rows;
    }

    static async getByTipo(tipo) {
        const { rows } = await pool.query('SELECT * FROM npcs WHERE tipo = $1', [tipo]);
        return rows;
    }

    static async updatePosicion(id, posicion_x, posicion_y, direccion) {
        const { rows } = await pool.query(
            'UPDATE npcs SET posicion_x = $1, posicion_y = $2, direccion = $3 WHERE id = $4 RETURNING *',
            [posicion_x, posicion_y, direccion, id]
        );
        return rows[0];
    }

    static async updateEstado(id, estado_actual) {
        const { rows } = await pool.query(
            'UPDATE npcs SET estado_actual = $1 WHERE id = $2 RETURNING *',
            [estado_actual, id]
        );
        return rows[0];
    }
}