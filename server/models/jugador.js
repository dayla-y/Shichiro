import { pool } from "../configs/db.js";

export class Jugadores {
    static async getAll() {
        const { rows } = await pool.query('SELECT * FROM jugadores');
        return rows;
    }

    static async getById(id) {
        const { rows } = await pool.query('SELECT * FROM jugadores WHERE id = $1', [id]);
        return rows[0];
    }

    static async create({
        nombre,
        nivel = 1,
        experiencia = 0,
        salud_actual,
        salud_maxima,
        velocidad_base,
        posicion_x,
        posicion_y,
        direccion,
        estado_actual,
        escena_actual,
        inventario_id
    }) {
        const { rows } = await pool.query(
            `INSERT INTO jugadores (
                nombre, nivel, experiencia, salud_actual, salud_maxima,
                velocidad_base, posicion_x, posicion_y, direccion,
                estado_actual, escena_actual, inventario_id
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *`,
            [
                nombre, nivel, experiencia, salud_actual, salud_maxima,
                velocidad_base, posicion_x, posicion_y, direccion,
                estado_actual, escena_actual, inventario_id
            ]
        );
        return rows[0];
    }

    static async update(id, {
        nombre,
        nivel,
        experiencia,
        salud_actual,
        salud_maxima,
        velocidad_base,
        posicion_x,
        posicion_y,
        direccion,
        estado_actual,
        escena_actual,
        inventario_id
    }) {
        const { rows } = await pool.query(
            `UPDATE jugadores SET 
                nombre = COALESCE($2, nombre),
                nivel = COALESCE($3, nivel),
                experiencia = COALESCE($4, experiencia),
                salud_actual = COALESCE($5, salud_actual),
                salud_maxima = COALESCE($6, salud_maxima),
                velocidad_base = COALESCE($7, velocidad_base),
                posicion_x = COALESCE($8, posicion_x),
                posicion_y = COALESCE($9, posicion_y),
                direccion = COALESCE($10, direccion),
                estado_actual = COALESCE($11, estado_actual),
                escena_actual = COALESCE($12, escena_actual),
                inventario_id = COALESCE($13, inventario_id),
                ultima_actualizacion = CURRENT_TIMESTAMP
            WHERE id = $1 RETURNING *`,
            [
                id, nombre, nivel, experiencia, salud_actual, salud_maxima,
                velocidad_base, posicion_x, posicion_y, direccion,
                estado_actual, escena_actual, inventario_id
            ]
        );
        return rows[0];
    }

    static async delete(id) {
        const { rows } = await pool.query('DELETE FROM jugadores WHERE id = $1 RETURNING *', [id]);
        return rows[0];
    }

    // Métodos adicionales específicos para jugadores
    static async updatePosition(id, posicion_x, posicion_y) {
        const { rows } = await pool.query(
            'UPDATE jugadores SET posicion_x = $2, posicion_y = $3 WHERE id = $1 RETURNING *',
            [id, posicion_x, posicion_y]
        );
        return rows[0];
    }

    static async updateHealth(id, salud_actual) {
        const { rows } = await pool.query(
            'UPDATE jugadores SET salud_actual = $2 WHERE id = $1 RETURNING *',
            [id, salud_actual]
        );
        return rows[0];
    }

    static async updateState(id, estado_actual) {
        const { rows } = await pool.query(
            'UPDATE jugadores SET estado_actual = $2 WHERE id = $1 RETURNING *',
            [id, estado_actual]
        );
        return rows[0];
    }
}