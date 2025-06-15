CREATE OR REPLACE PROCEDURE recibir_medicamentos(
    p_numero_orden VARCHAR,
    p_proveedor_id INTEGER,
    p_sucursal_id INTEGER,
    p_empleado_validador INTEGER,
    p_detalles JSONB
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_recepcion_id INTEGER;
    v_item JSONB;
    v_medicamento RECORD;
BEGIN
    -- Crear registro de recepción
    INSERT INTO recepciones(numero_orden, proveedor_id, sucursal_id, empleado_validador)
    VALUES (p_numero_orden, p_proveedor_id, p_sucursal_id, p_empleado_validador)
    RETURNING id INTO v_recepcion_id;
    
    -- Procesar cada item
    FOR v_item IN SELECT * FROM jsonb_array_elements(p_detalles)
    LOOP
        -- Verificar que el medicamento existe
        SELECT * INTO v_medicamento FROM medicamentos WHERE id = (v_item->>'medicamento_id')::INTEGER;
        
        IF NOT FOUND THEN
            RAISE EXCEPTION 'Medicamento con ID % no encontrado', (v_item->>'medicamento_id')::INTEGER;
        END IF;
        
        -- Registrar detalle de recepción
        INSERT INTO detalles_recepcion(recepcion_id, medicamento_id, cantidad, lote, fecha_vencimiento)
        VALUES (
            v_recepcion_id, 
            v_medicamento.id, 
            (v_item->>'cantidad')::INTEGER, 
            v_item->>'lote', 
            (v_item->>'fecha_vencimiento')::DATE
        );
        
        -- Actualizar stock
        UPDATE medicamentos
        SET stock_actual = stock_actual + (v_item->>'cantidad')::INTEGER
        WHERE id = v_medicamento.id;
        
        -- Registrar en tabla de caducidades
        INSERT INTO registro_caducidades(medicamento_id, lote, fecha_vencimiento, cantidad, estado)
        VALUES (
            v_medicamento.id,
            v_item->>'lote',
            (v_item->>'fecha_vencimiento')::DATE,
            (v_item->>'cantidad')::INTEGER,
            'en_stock'
        );
    END LOOP;
    
    -- Marcar recepción como validada
    UPDATE recepciones SET estado_validacion = TRUE WHERE id = v_recepcion_id;
    
    -- Verificar caducidades próximas
    PERFORM verificar_caducidades_proximas();
END;
$$;