import { pool } from "../configs/db.js";

export class EstadosJugador {
    static async getAll() {
        const { rows } = await pool.query('SELECT * FROM estados_jugador');
        return rows;
    }

    static async getById(id) {
        const { rows } = await pool.query('SELECT * FROM estados_jugador WHERE id = $1', [id]);
        return rows[0];
    }

    static async getByJugadorId(jugador_id) {
        const { rows } = await pool.query('SELECT * FROM estados_jugador WHERE jugador_id = $1', [jugador_id]);
        return rows;
    }

    static async create({
        jugador_id,
        estado_actual,
        estado_anterior = null,
        tiempo_en_estado = 0,
        puede_interactuar = true,
        puede_moverse = true,
        puede_atacar = false
    }) {
        const { rows } = await pool.query(
            `INSERT INTO estados_jugador (
                jugador_id, estado_actual, estado_anterior,
                tiempo_en_estado, puede_interactuar,
                puede_moverse, puede_atacar
            ) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
            [
                jugador_id, estado_actual, estado_anterior,
                tiempo_en_estado, puede_interactuar,
                puede_moverse, puede_atacar
            ]
        );
        return rows[0];
    }

    static async update(id, {
        estado_actual,
        estado_anterior,
        tiempo_en_estado,
        puede_interactuar,
        puede_moverse,
        puede_atacar
    }) {
        const { rows } = await pool.query(
            `UPDATE estados_jugador SET 
                estado_actual = COALESCE($2, estado_actual),
                estado_anterior = COALESCE($3, estado_anterior),
                tiempo_en_estado = COALESCE($4, tiempo_en_estado),
                puede_interactuar = COALESCE($5, puede_interactuar),
                puede_moverse = COALESCE($6, puede_moverse),
                puede_atacar = COALESCE($7, puede_atacar)
            WHERE id = $1 RETURNING *`,
            [
                id, estado_actual, estado_anterior,
                tiempo_en_estado, puede_interactuar,
                puede_moverse, puede_atacar
            ]
        );
        return rows[0];
    }

    static async delete(id) {
        const { rows } = await pool.query('DELETE FROM estados_jugador WHERE id = $1 RETURNING *', [id]);
        return rows[0];
    }

    // Métodos específicos para estados de jugador
    static async updateState(jugador_id, nuevo_estado) {
        // Primero obtenemos el estado actual para guardarlo como anterior
        const currentState = await pool.query(
            'SELECT estado_actual FROM estados_jugador WHERE jugador_id = $1 ORDER BY id DESC LIMIT 1',
            [jugador_id]
        );

        const estado_anterior = currentState.rows[0]?.estado_actual || null;

        const { rows } = await pool.query(
            `INSERT INTO estados_jugador (
                jugador_id, estado_actual, estado_anterior
            ) VALUES ($1, $2, $3) RETURNING *`,
            [jugador_id, nuevo_estado, estado_anterior]
        );
        return rows[0];
    }
}