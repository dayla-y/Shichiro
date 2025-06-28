import { pool } from "../configs/db.js";

export class Proveedores {
    static async getAll() {
        const { rows } = await pool.query('SELECT * FROM proveedores');
        return rows;
    }

    static async getById(id) {
        const { rows } = await pool.query('SELECT * FROM proveedores WHERE id = $1', [id]);
        return rows[0];
    }

    static async create({ nombre, contacto, telefono, acepta_devoluciones, penalizacion_devolucion }) {
        const { rows } = await pool.query(
            'INSERT INTO proveedores (nombre, contacto, telefono, acepta_devoluciones, penalizacion_devolucion) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [nombre, contacto, telefono, acepta_devoluciones, penalizacion_devolucion]
        );
        return rows[0];
    }

    static async update(id, { nombre, contacto, telefono, acepta_devoluciones, penalizacion_devolucion }) {
        const { rows } = await pool.query(
            'UPDATE proveedores SET nombre = $1, contacto = $2, telefono = $3, acepta_devoluciones = $4, penalizacion_devolucion = $5 WHERE id = $6 RETURNING *',
            [nombre, contacto, telefono, acepta_devoluciones, penalizacion_devolucion, id]
        );
        return rows[0];
    }

    static async delete(id) {
        const { rows } = await pool.query('DELETE FROM proveedores WHERE id = $1 RETURNING *', [id]);
        return rows[0];
    }
}