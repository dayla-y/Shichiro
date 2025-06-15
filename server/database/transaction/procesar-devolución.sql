CREATE OR REPLACE PROCEDURE procesar_devolucion(
    p_recepcion_id INTEGER,
    p_medicamento_id INTEGER,
    p_cantidad INTEGER,
    p_motivo TEXT,
    p_empleado_id INTEGER
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_proveedor_id INTEGER;
    v_acepta_devoluciones BOOLEAN;
    v_penalizacion NUMERIC(5,2);
    v_lote VARCHAR(50);
    v_fecha_vencimiento DATE;
BEGIN
    -- Iniciar transacción
    BEGIN
        -- Obtener datos del proveedor
        SELECT r.proveedor_id, p.acepta_devoluciones, p.penalizacion_devolucion
        INTO v_proveedor_id, v_acepta_devoluciones, v_penalizacion
        FROM recepciones r
        JOIN proveedores p ON r.proveedor_id = p.id
        WHERE r.id = p_recepcion_id;
        
        IF NOT FOUND THEN
            RAISE EXCEPTION 'Recepción no encontrada';
        END IF;
        
        -- Obtener lote y fecha de vencimiento
        SELECT lote, fecha_vencimiento INTO v_lote, v_fecha_vencimiento
        FROM detalles_recepcion
        WHERE recepcion_id = p_recepcion_id AND medicamento_id = p_medicamento_id
        LIMIT 1;
        
        -- Registrar devolución
        INSERT INTO devoluciones(
            recepcion_id, medicamento_id, cantidad, motivo, 
            penalizacion_aplicada, empleado_id
        )
        VALUES (
            p_recepcion_id, p_medicamento_id, p_cantidad, p_motivo,
            CASE WHEN v_acepta_devoluciones THEN v_penalizacion ELSE NULL END,
            p_empleado_id
        );
        
        -- Actualizar stock (reducirlo)
        UPDATE medicamentos
        SET stock_actual = stock_actual - p_cantidad
        WHERE id = p_medicamento_id;
        
        -- Actualizar registro de caducidades
        UPDATE registro_caducidades
        SET cantidad = cantidad - p_cantidad,
            estado = 'devuelto'
        WHERE medicamento_id = p_medicamento_id
        AND lote = v_lote
        AND fecha_vencimiento = v_fecha_vencimiento;
        
        -- Si el proveedor acepta devoluciones, crear pedido de reemplazo
        IF v_acepta_devoluciones THEN
            INSERT INTO pedidos(
                medicamento_id, cantidad, fecha_pedido, estado, prioridad
            )
            VALUES (
                p_medicamento_id, p_cantidad, CURRENT_TIMESTAMP, 
                'pendiente', 1
            );
        END IF;
        
        -- Confirmar transacción
        COMMIT;
    EXCEPTION
        WHEN OTHERS THEN
            -- Revertir en caso de error
            ROLLBACK;
            RAISE;
    END;
END;
$$;