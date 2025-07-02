import { pool } from "../configs/db.js";

export class InventarioJugador {
    static async getByJugadorId(jugador_id) {
        const { rows } = await pool.query(
            'SELECT * FROM inventario_jugador WHERE jugador_id = $1', 
            [jugador_id]
        );
        return rows[0];
    }

    static async create({ jugador_id, capacidad_maxima }) {
        const { rows } = await pool.query(
            'INSERT INTO inventario_jugador (jugador_id, capacidad_maxima, slots_disponibles) VALUES ($1, $2, $2) RETURNING *',
            [jugador_id, capacidad_maxima]
        );
        return rows[0];
    }

    static async updateCapacidad(id, capacidad_maxima) {
        const { rows } = await pool.query(
            `UPDATE inventario_jugador 
             SET capacidad_maxima = $1, 
                 slots_disponibles = slots_disponibles + ($1 - capacidad_maxima)
             WHERE id = $2 RETURNING *`,
            [capacidad_maxima, id]
        );
        return rows[0];
    }

    static async getItems(inventario_id) {
        const { rows } = await pool.query(
            `SELECT ij.*, on.nombre as objeto_nombre, m.nombre as medicamento_nombre
             FROM items_jugador ij
             LEFT JOIN objetos_nivel on ON ij.objeto_id = on.id
             LEFT JOIN medicamentos m ON ij.medicamento_id = m.id
             WHERE ij.inventario_id = $1`,
            [inventario_id]
        );
        return rows;
    }

    static async addItem(inventario_id, { objeto_id, medicamento_id, cantidad, posicion_inventario }) {
        // Verificar si hay espacio disponible
        const inventario = await this.getById(inventario_id);
        if (inventario.slots_disponibles < 1) {
            throw new Error('No hay espacio disponible en el inventario');
        }

        const { rows } = await pool.query(
            `INSERT INTO items_jugador 
             (inventario_id, objeto_id, medicamento_id, cantidad, posicion_inventario) 
             VALUES ($1, $2, $3, $4, $5)
             RETURNING *`,
            [inventario_id, objeto_id, medicamento_id, cantidad, posicion_inventario]
        );

        // Actualizar slots disponibles
        await pool.query(
            'UPDATE inventario_jugador SET slots_disponibles = slots_disponibles - 1 WHERE id = $1',
            [inventario_id]
        );

        return rows[0];
    }

    static async removeItem(item_id, inventario_id) {
        const { rowCount } = await pool.query(
            'DELETE FROM items_jugador WHERE id = $1 RETURNING *',
            [item_id]
        );

        if (rowCount > 0) {
            await pool.query(
                'UPDATE inventario_jugador SET slots_disponibles = slots_disponibles + 1 WHERE id = $1',
                [inventario_id]
            );
        }

        return rowCount > 0;
    }

    static async updateItem(item_id, updates) {
        const fields = [];
        const values = [];
        let paramIndex = 1;

        for (const [key, value] of Object.entries(updates)) {
            fields.push(`${key} = $${paramIndex}`);
            values.push(value);
            paramIndex++;
        }

        values.push(item_id);

        const query = `UPDATE items_jugador SET ${fields.join(', ')} WHERE id = $${paramIndex} RETURNING *`;
        const { rows } = await pool.query(query, values);
        return rows[0];
    }
}