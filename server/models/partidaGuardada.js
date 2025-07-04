import { pool } from "../configs/db.js";

export class PartidasGuardadas {
    static async getAllByPlayer(jugador_id) {
        const { rows } = await pool.query(
            'SELECT * FROM partidas_guardadas WHERE jugador_id = $1 ORDER BY fecha_guardado DESC',
            [jugador_id]
        );
        return rows;
    }

    static async getById(id) {
        const { rows } = await pool.query(
            'SELECT * FROM partidas_guardadas WHERE id = $1',
            [id]
        );
        return rows[0];
    }

    static async create({
        jugador_id,
        nombre_partida,
        escena_actual,
        posicion_x,
        posicion_y,
        datos_jugador,
        datos_inventario,
        datos_mundo,
        tiempo_juego
    }) {
        const { rows } = await pool.query(
            `INSERT INTO partidas_guardadas (
                jugador_id,
                nombre_partida,
                escena_actual,
                posicion_x,
                posicion_y,
                datos_jugador,
                datos_inventario,
                datos_mundo,
                tiempo_juego
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
            [
                jugador_id,
                nombre_partida,
                escena_actual,
                posicion_x,
                posicion_y,
                datos_jugador,
                datos_inventario,
                datos_mundo,
                tiempo_juego
            ]
        );
        return rows[0];
    }

    static async update(id, {
        nombre_partida,
        escena_actual,
        posicion_x,
        posicion_y,
        datos_jugador,
        datos_inventario,
        datos_mundo,
        tiempo_juego
    }) {
        const { rows } = await pool.query(
            `UPDATE partidas_guardadas SET
                nombre_partida = $1,
                escena_actual = $2,
                posicion_x = $3,
                posicion_y = $4,
                datos_jugador = $5,
                datos_inventario = $6,
                datos_mundo = $7,
                tiempo_juego = $8,
                fecha_guardado = CURRENT_TIMESTAMP
            WHERE id = $9 RETURNING *`,
            [
                nombre_partida,
                escena_actual,
                posicion_x,
                posicion_y,
                datos_jugador,
                datos_inventario,
                datos_mundo,
                tiempo_juego,
                id
            ]
        );
        return rows[0];
    }

    static async delete(id) {
        const { rows } = await pool.query(
            'DELETE FROM partidas_guardadas WHERE id = $1 RETURNING *',
            [id]
        );
        return rows[0];
    }

    static async getLatestByPlayer(jugador_id) {
        const { rows } = await pool.query(
            'SELECT * FROM partidas_guardadas WHERE jugador_id = $1 ORDER BY fecha_guardado DESC LIMIT 1',
            [jugador_id]
        );
        return rows[0];
    }
}