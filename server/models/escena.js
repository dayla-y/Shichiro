import { pool } from "../configs/db.js";

export class Escenas {
    static async getAll() {
        const { rows } = await pool.query('SELECT * FROM escenas');
        return rows;
    }

    static async getById(id) {
        const { rows } = await pool.query('SELECT * FROM escenas WHERE id = $1', [id]);
        return rows[0];
    }

    static async getByNombre(nombre) {
        const { rows } = await pool.query('SELECT * FROM escenas WHERE nombre = $1', [nombre]);
        return rows[0];
    }

    static async create({ nombre, archivo_mapa, musica_fondo, spawn_x, spawn_y, propiedades }) {
        const { rows } = await pool.query(
            'INSERT INTO escenas (nombre, archivo_mapa, musica_fondo, spawn_x, spawn_y, propiedades) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [nombre, archivo_mapa, musica_fondo, spawn_x, spawn_y, propiedades]
        );
        return rows[0];
    }

    static async update(id, { nombre, archivo_mapa, musica_fondo, spawn_x, spawn_y, propiedades }) {
        const { rows } = await pool.query(
            'UPDATE escenas SET nombre = $1, archivo_mapa = $2, musica_fondo = $3, spawn_x = $4, spawn_y = $5, propiedades = $6 WHERE id = $7 RETURNING *',
            [nombre, archivo_mapa, musica_fondo, spawn_x, spawn_y, propiedades, id]
        );
        return rows[0];
    }

    static async delete(id) {
        const { rows } = await pool.query('DELETE FROM escenas WHERE id = $1 RETURNING *', [id]);
        return rows[0];
    }
}