import { pool } from "../configs/db.js";

export class verificar_requiere_receta {
    static async verificarRequiereReceta(ventaId) {
        const { rows } = await pool.query(
            'SELECT verificar_requiere_receta($1) as valido',
            [ventaId]
        );
        return rows[0].valido;
    }
}