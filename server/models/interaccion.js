import { pool } from "../configs/db.js";

export class Interacciones {
    static async getAll() {
        const { rows } = await pool.query('SELECT * FROM interacciones_jugador');
        return rows;
    }

    static async getById(id) {
        const { rows } = await pool.query('SELECT * FROM interacciones_jugador WHERE id = $1', [id]);
        return rows[0];
    }

    static async getByJugadorId(jugador_id) {
        const { rows } = await pool.query('SELECT * FROM interacciones_jugador WHERE jugador_id = $1', [jugador_id]);
        return rows;
    }

    static async getByObjetoId(objeto_id) {
        const { rows } = await pool.query('SELECT * FROM interacciones_jugador WHERE objeto_id = $1', [objeto_id]);
        return rows;
    }

    static async create({ jugador_id, objeto_id, tipo_interaccion, resultado }) {
        const { rows } = await pool.query(
            'INSERT INTO interacciones_jugador (jugador_id, objeto_id, tipo_interaccion, resultado) VALUES ($1, $2, $3, $4) RETURNING *',
            [jugador_id, objeto_id, tipo_interaccion, resultado]
        );
        return rows[0];
    }

    static async update(id, { jugador_id, objeto_id, tipo_interaccion, resultado }) {
        const { rows } = await pool.query(
            'UPDATE interacciones_jugador SET jugador_id = $1, objeto_id = $2, tipo_interaccion = $3, resultado = $4 WHERE id = $5 RETURNING *',
            [jugador_id, objeto_id, tipo_interaccion, resultado, id]
        );
        return rows[0];
    }

    static async delete(id) {
        const { rows } = await pool.query('DELETE FROM interacciones_jugador WHERE id = $1 RETURNING *', [id]);
        return rows[0];
    }
}