CREATE OR REPLACE PROCEDURE transferir_medicamento(
    p_medicamento_id INTEGER,
    p_cantidad INTEGER,
    p_sucursal_origen INTEGER,
    p_sucursal_destino INTEGER,
    p_empleado_id INTEGER
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_stock_actual INTEGER;
BEGIN
    -- Verificar stock en sucursal origen
    SELECT stock_actual INTO v_stock_actual
    FROM inventarios_sucursal
    WHERE medicamento_id = p_medicamento_id AND sucursal_id = p_sucursal_origen;
    
    IF v_stock_actual < p_cantidad THEN
        RAISE EXCEPTION 'Stock insuficiente en la sucursal de origen';
    END IF;
    
    -- Registrar transferencia
    INSERT INTO transferencias(
        medicamento_id, cantidad, sucursal_origen, sucursal_destino, 
        empleado_id, fecha
    )
    VALUES (
        p_medicamento_id, p_cantidad, p_sucursal_origen, p_sucursal_destino,
        p_empleado_id, CURRENT_TIMESTAMP
    );
    
    -- Actualizar stocks
    UPDATE inventarios_sucursal
    SET stock_actual = stock_actual - p_cantidad
    WHERE medicamento_id = p_medicamento_id AND sucursal_id = p_sucursal_origen;
    
    UPDATE inventarios_sucursal
    SET stock_actual = stock_actual + p_cantidad
    WHERE medicamento_id = p_medicamento_id AND sucursal_id = p_sucursal_destino;
END;
$$;