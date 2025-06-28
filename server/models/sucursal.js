import { pool } from "../configs/db.js";

export class Sucursales {
    static async getAll() {
        const { rows } = await pool.query('SELECT * FROM sucursales WHERE activa = true');
        return rows;
    }

    static async getById(id) {
        const { rows } = await pool.query('SELECT * FROM sucursales WHERE id = $1', [id]);
        return rows[0];
    }

    static async create({ 
        nombre, 
        direccion, 
        telefono, 
        horario_apertura, 
        horario_cierre, 
        es_principal, 
        capacidad_pacientes, 
        almacen_id, 
        gerente_id, 
        datos_adicionales 
    }) {
        const { rows } = await pool.query(
            `INSERT INTO sucursales (
                nombre, 
                direccion, 
                telefono, 
                horario_apertura, 
                horario_cierre, 
                es_principal, 
                capacidad_pacientes, 
                almacen_id, 
                gerente_id, 
                datos_adicionales
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
            [
                nombre, 
                direccion, 
                telefono, 
                horario_apertura, 
                horario_cierre, 
                es_principal, 
                capacidad_pacientes, 
                almacen_id, 
                gerente_id, 
                datos_adicionales
            ]
        );
        return rows[0];
    }

    static async update(id, { 
        nombre, 
        direccion, 
        telefono, 
        horario_apertura, 
        horario_cierre, 
        es_principal, 
        capacidad_pacientes, 
        almacen_id, 
        gerente_id, 
        datos_adicionales 
    }) {
        const { rows } = await pool.query(
            `UPDATE sucursales SET 
                nombre = $1, 
                direccion = $2, 
                telefono = $3, 
                horario_apertura = $4, 
                horario_cierre = $5, 
                es_principal = $6, 
                capacidad_pacientes = $7, 
                almacen_id = $8, 
                gerente_id = $9, 
                datos_adicionales = $10,
                updated_at = NOW()
            WHERE id = $11 RETURNING *`,
            [
                nombre, 
                direccion, 
                telefono, 
                horario_apertura, 
                horario_cierre, 
                es_principal, 
                capacidad_pacientes, 
                almacen_id, 
                gerente_id, 
                datos_adicionales,
                id
            ]
        );
        return rows[0];
    }

    static async delete(id) {
        // En lugar de borrar, marcamos como inactiva
        const { rows } = await pool.query(
            'UPDATE sucursales SET activa = false WHERE id = $1 RETURNING *', 
            [id]
        );
        return rows[0];
    }

    // Método adicional para obtener sucursales principales
    static async getPrincipales() {
        const { rows } = await pool.query(
            'SELECT * FROM sucursales WHERE es_principal = true AND activa = true'
        );
        return rows;
    }
}