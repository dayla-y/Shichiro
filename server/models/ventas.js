import { pool } from "../configs/db.js";

export class Ventas {
    static async getAll() {
        const { rows } = await pool.query('SELECT * FROM ventas');
        return rows;
    }

    static async getById(id) {
        const { rows } = await pool.query('SELECT * FROM ventas WHERE id = $1', [id]);
        return rows[0];
    }

    static async create({ paciente_nombre, doctor_nombre, doctor_telefono, doctor_licencia, empleado_id, total }) {
        const { rows } = await pool.query(
            `INSERT INTO ventas 
            (paciente_nombre, doctor_nombre, doctor_telefono, doctor_licencia, empleado_id, total) 
            VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
            [paciente_nombre, doctor_nombre, doctor_telefono, doctor_licencia, empleado_id, total]
        );
        return rows[0];
    }

    static async update(id, { paciente_nombre, doctor_nombre, doctor_telefono, doctor_licencia, empleado_id, total }) {
        const { rows } = await pool.query(
            `UPDATE ventas SET 
            paciente_nombre = $1, 
            doctor_nombre = $2, 
            doctor_telefono = $3, 
            doctor_licencia = $4, 
            empleado_id = $5, 
            total = $6 
            WHERE id = $7 RETURNING *`,
            [paciente_nombre, doctor_nombre, doctor_telefono, doctor_licencia, empleado_id, total, id]
        );
        return rows[0];
    }

    static async delete(id) {
        const { rows } = await pool.query('DELETE FROM ventas WHERE id = $1 RETURNING *', [id]);
        return rows[0];
    }

    // Métodos específicos para detalles de venta
    static async getDetallesByVentaId(venta_id) {
        const { rows } = await pool.query('SELECT * FROM detalles_venta WHERE venta_id = $1', [venta_id]);
        return rows;
    }

    static async addDetalleVenta({ venta_id, medicamento_id, cantidad, precio_unitario, descuento, comision_empleado }) {
        const { rows } = await pool.query(
            `INSERT INTO detalles_venta 
            (venta_id, medicamento_id, cantidad, precio_unitario, descuento, comision_empleado) 
            VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
            [venta_id, medicamento_id, cantidad, precio_unitario, descuento, comision_empleado]
        );
        return rows[0];
    }

    static async updateDetalleVenta(id, { medicamento_id, cantidad, precio_unitario, descuento, comision_empleado }) {
        const { rows } = await pool.query(
            `UPDATE detalles_venta SET 
            medicamento_id = $1, 
            cantidad = $2, 
            precio_unitario = $3, 
            descuento = $4, 
            comision_empleado = $5 
            WHERE id = $6 RETURNING *`,
            [medicamento_id, cantidad, precio_unitario, descuento, comision_empleado, id]
        );
        return rows[0];
    }

    static async deleteDetalleVenta(id) {
        const { rows } = await pool.query('DELETE FROM detalles_venta WHERE id = $1 RETURNING *', [id]);
        return rows[0];
    }

}