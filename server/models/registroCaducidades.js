import { pool } from "../configs/db.js";

export class RegistroCaducidades {
    static async getAll() {
        const { rows } = await pool.query('SELECT * FROM registro_caducidades');
        return rows;
    }

    static async getById(id) {
        const { rows } = await pool.query('SELECT * FROM registro_caducidades WHERE id = $1', [id]);
        return rows[0];
    }

    static async create({ medicamento_id, lote, fecha_vencimiento, cantidad, estado }) {
        const { rows } = await pool.query(
            'INSERT INTO registro_caducidades (medicamento_id, lote, fecha_vencimiento, cantidad, estado) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [medicamento_id, lote, fecha_vencimiento, cantidad, estado]
        );
        return rows[0];
    }

    static async update(id, { medicamento_id, lote, fecha_vencimiento, cantidad, estado }) {
        const { rows } = await pool.query(
            'UPDATE registro_caducidades SET medicamento_id = $1, lote = $2, fecha_vencimiento = $3, cantidad = $4, estado = $5 WHERE id = $6 RETURNING *',
            [medicamento_id, lote, fecha_vencimiento, cantidad, estado, id]
        );
        return rows[0];
    }

    static async delete(id) {
        const { rows } = await pool.query('DELETE FROM registro_caducidades WHERE id = $1 RETURNING *', [id]);
        return rows[0];
    }

    // Método adicional para buscar por medicamento_id
    static async getByMedicamentoId(medicamento_id) {
        const { rows } = await pool.query('SELECT * FROM registro_caducidades WHERE medicamento_id = $1', [medicamento_id]);
        return rows;
    }

    // Método adicional para buscar registros próximos a vencer
    static async getProximosAVencer(dias = 30) {
        const { rows } = await pool.query(
            'SELECT * FROM registro_caducidades WHERE fecha_vencimiento BETWEEN CURRENT_DATE AND CURRENT_DATE + $1 * INTERVAL \'1 day\'',
            [dias]
        );
        return rows;
    }
}