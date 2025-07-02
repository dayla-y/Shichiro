// models/transferencias.js
import { pool } from "../configs/db.js";

export class Transferencias {
  static async transferirMedicamento({
    medicamento_id,
    cantidad,
    sucursal_origen,
    sucursal_destino,
    empleado_id
  }) {
    // Llamamos al procedimiento almacenado
    const { rows } = await pool.query(
      'CALL transferir_medicamento($1, $2, $3, $4, $5)',
      [medicamento_id, cantidad, sucursal_origen, sucursal_destino, empleado_id]
    );
    return rows[0];
  }

  static async getHistorialTransferencias() {
    const { rows } = await pool.query('SELECT * FROM transferencias ORDER BY fecha DESC');
    return rows;
  }

  static async getTransferenciasPorSucursal(sucursal_id) {
    const { rows } = await pool.query(
      `SELECT * FROM transferencias 
       WHERE sucursal_origen = $1 OR sucursal_destino = $1 
       ORDER BY fecha DESC`,
      [sucursal_id]
    );
    return rows;
  }

  static async getTransferenciaById(id) {
    const { rows } = await pool.query('SELECT * FROM transferencias WHERE id = $1', [id]);
    return rows[0];
  }
}