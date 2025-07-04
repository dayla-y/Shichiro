import { pool } from "../configs/db.js";

export class Animaciones {
    static async getAll() {
        const { rows } = await pool.query('SELECT * FROM animaciones');
        return rows;
    }

    static async getById(id) {
        const { rows } = await pool.query('SELECT * FROM animaciones WHERE id = $1', [id]);
        return rows[0];
    }

    static async create({ nombre, entidad_tipo, entidad_id, estado_asociado, frames, velocidad, loop }) {
        const { rows } = await pool.query(
            'INSERT INTO animaciones (nombre, entidad_tipo, entidad_id, estado_asociado, frames, velocidad, loop) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [nombre, entidad_tipo, entidad_id, estado_asociado, frames, velocidad, loop]
        );
        return rows[0];
    }

    static async update(id, { nombre, entidad_tipo, entidad_id, estado_asociado, frames, velocidad, loop }) {
        const { rows } = await pool.query(
            'UPDATE animaciones SET nombre = $1, entidad_tipo = $2, entidad_id = $3, estado_asociado = $4, frames = $5, velocidad = $6, loop = $7 WHERE id = $8 RETURNING *',
            [nombre, entidad_tipo, entidad_id, estado_asociado, frames, velocidad, loop, id]
        );
        return rows[0];
    }

    static async delete(id) {
        const { rows } = await pool.query('DELETE FROM animaciones WHERE id = $1 RETURNING *', [id]);
        return rows[0];
    }

    // Métodos adicionales específicos para animaciones
    static async getByEntity(entidad_tipo, entidad_id) {
        const { rows } = await pool.query(
            'SELECT * FROM animaciones WHERE entidad_tipo = $1 AND entidad_id = $2',
            [entidad_tipo, entidad_id]
        );
        return rows;
    }

    static async getByState(estado_asociado) {
        const { rows } = await pool.query(
            'SELECT * FROM animaciones WHERE estado_asociado = $1',
            [estado_asociado]
        );
        return rows;
    }
}