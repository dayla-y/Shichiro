import { pool } from "../configs/db.js";

export class Recepciones {
    static async getAll() {
        const { rows } = await pool.query(`
            SELECT r.*, p.nombre as proveedor_nombre, s.nombre as sucursal_nombre
            FROM recepciones r
            LEFT JOIN proveedores p ON r.proveedor_id = p.id
            LEFT JOIN sucursales s ON r.sucursal_id = s.id
        `);
        return rows;
    }

    static async getById(id) {
        const { rows } = await pool.query('SELECT * FROM recepciones WHERE id = $1', [id]);
        return rows[0];
    }

    static async create({ numero_orden, proveedor_id, sucursal_id, empleado_validador }) {
        const { rows } = await pool.query(
            `INSERT INTO recepciones 
            (numero_orden, proveedor_id, sucursal_id, empleado_validador) 
            VALUES ($1, $2, $3, $4) 
            RETURNING *`,
            [numero_orden, proveedor_id, sucursal_id, empleado_validador]
        );
        return rows[0];
    }

    static async update(id, { numero_orden, proveedor_id, sucursal_id, estado_validacion, empleado_validador }) {
        const { rows } = await pool.query(
            `UPDATE recepciones SET 
            numero_orden = $1, 
            proveedor_id = $2,
            sucursal_id = $3, 
            estado_validacion = $4,
            empleado_validador = $5
            WHERE id = $6
            RETURNING *`,
            [numero_orden, proveedor_id, sucursal_id, estado_validacion, empleado_validador, id]
        );
        return rows[0];
    }

    static async delete(id) {
        const { rows } = await pool.query('DELETE FROM recepciones WHERE id = $1 RETURNING *', [id]);
        return rows[0];
    }

    static async validateRecepcion(id, empleado_validador) {
        const { rows } = await pool.query(
            `UPDATE recepciones SET 
            estado_validacion = TRUE,
            empleado_validador = $1
            WHERE id = $2
            RETURNING *`,
            [empleado_validador, id]
        );
        return rows[0];
    }

    static async getDetallesByRecepcion(recepcion_id) {
        const { rows } = await pool.query(
            `SELECT dr.*, m.nombre as medicamento_nombre 
             FROM detalles_recepcion dr
             JOIN medicamentos m ON dr.medicamento_id = m.id
             WHERE dr.recepcion_id = $1`,
            [recepcion_id]
        );
        return rows;
    }

    static async addDetalleRecepcion({ recepcion_id, medicamento_id, cantidad, lote, fecha_vencimiento }) {
        const { rows } = await pool.query(
            `INSERT INTO detalles_recepcion 
            (recepcion_id, medicamento_id, cantidad, lote, fecha_vencimiento) 
            VALUES ($1, $2, $3, $4, $5) 
            RETURNING *`,
            [recepcion_id, medicamento_id, cantidad, lote, fecha_vencimiento]
        );
        return rows[0];
    }

    static async updateDetalleRecepcion(id, { cantidad, lote, fecha_vencimiento }) {
        const { rows } = await pool.query(
            `UPDATE detalles_recepcion SET 
            cantidad = $1,
            lote = $2,
            fecha_vencimiento = $3
            WHERE id = $4
            RETURNING *`,
            [cantidad, lote, fecha_vencimiento, id]
        );
        return rows[0];
    }

    static async removeDetalleRecepcion(id) {
        const { rows } = await pool.query('DELETE FROM detalles_recepcion WHERE id = $1 RETURNING *', [id]);
        return rows[0];
    }
}