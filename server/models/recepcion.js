import { pool } from "../configs/db.js";

export class Recepcion {
    static async recibirMedicamentos({
        numero_orden,
        proveedor_id,
        sucursal_id,
        empleado_validador,
        detalles
    }) {
        const { rows } = await pool.query(
            'CALL recibir_medicamentos($1, $2, $3, $4, $5)',
            [numero_orden, proveedor_id, sucursal_id, empleado_validador, JSON.stringify(detalles)]
        );
        return rows[0];
    }

    static async getAll() {
        const { rows } = await pool.query('SELECT * FROM recepciones');
        return rows;
    }

    static async getById(id) {
        const { rows } = await pool.query('SELECT * FROM recepciones WHERE id = $1', [id]);
        return rows[0];
    }

    static async getDetallesByRecepcionId(recepcion_id) {
        const { rows } = await pool.query(
            'SELECT * FROM detalles_recepcion WHERE recepcion_id = $1',
            [recepcion_id]
        );
        return rows;
    }
}