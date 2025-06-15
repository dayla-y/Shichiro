CREATE OR REPLACE PROCEDURE realizar_venta(
    p_paciente_nombre VARCHAR,
    p_doctor_nombre VARCHAR,
    p_doctor_telefono VARCHAR,
    p_doctor_licencia VARCHAR,
    p_empleado_id INTEGER,
    p_detalles JSONB
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_venta_id INTEGER;
    v_item JSONB;
    v_medicamento RECORD;
    v_total NUMERIC(10,2) := 0;
    v_comision NUMERIC(5,2) := 0;
BEGIN
    -- Verificar stock y requisitos antes de iniciar
    FOR v_item IN SELECT * FROM jsonb_array_elements(p_detalles)
    LOOP
        SELECT * INTO v_medicamento FROM medicamentos WHERE id = (v_item->>'medicamento_id')::INTEGER;
        
        IF v_medicamento.stock_actual < (v_item->>'cantidad')::INTEGER THEN
            RAISE EXCEPTION 'Stock insuficiente para el medicamento %', v_medicamento.nombre;
        END IF;
        
        IF v_medicamento.requiere_receta AND (p_doctor_nombre IS NULL OR p_doctor_licencia IS NULL) THEN
            RAISE EXCEPTION 'Medicamento % requiere receta médica', v_medicamento.nombre;
        END IF;
    END LOOP;
    
    -- Crear registro de venta
    INSERT INTO ventas(paciente_nombre, doctor_nombre, doctor_telefono, doctor_licencia, empleado_id, total)
    VALUES (p_paciente_nombre, p_doctor_nombre, p_doctor_telefono, p_doctor_licencia, p_empleado_id, 0)
    RETURNING id INTO v_venta_id;
    
    -- Procesar cada item
    FOR v_item IN SELECT * FROM jsonb_array_elements(p_detalles)
    LOOP
        SELECT * INTO v_medicamento FROM medicamentos WHERE id = (v_item->>'medicamento_id')::INTEGER;
        
        -- Calcular precio con descuento si está en promoción
        DECLARE
            v_precio NUMERIC(10,2) := v_medicamento.precio;
            v_descuento NUMERIC(5,2) := 0;
            v_comision_item NUMERIC(5,2) := 0;
        BEGIN
            -- Buscar promoción activa
            SELECT mp.porcentaje_descuento INTO v_descuento
            FROM promociones p
            JOIN medicamentos_promocion mp ON p.id = mp.promocion_id
            WHERE mp.medicamento_id = v_medicamento.id
            AND CURRENT_DATE BETWEEN p.fecha_inicio AND p.fecha_fin
            AND mp.stock_actual_promocion > 0;
            
            -- Aplicar descuento si existe
            IF v_descuento > 0 THEN
                v_precio := v_medicamento.precio * (1 - v_descuento/100);
                
                -- Actualizar stock de promoción
                UPDATE medicamentos_promocion
                SET stock_actual_promocion = stock_actual_promocion - (v_item->>'cantidad')::INTEGER
                WHERE medicamento_id = v_medicamento.id
                AND promocion_id IN (
                    SELECT id FROM promociones 
                    WHERE CURRENT_DATE BETWEEN fecha_inicio AND fecha_fin
                );
            END IF;
            
            -- Calcular comisión si es vitamina/suplemento
            IF v_medicamento.clasificacion = 'vitamina_suplemento' THEN
                SELECT porcentaje_comision INTO v_comision_item
                FROM empleados WHERE id = p_empleado_id;
                
                v_comision_item := v_precio * (v_item->>'cantidad')::INTEGER * (v_comision_item/100);
                v_comision := v_comision + v_comision_item;
            END IF;
            
            -- Registrar detalle de venta
            INSERT INTO detalles_venta(venta_id, medicamento_id, cantidad, precio_unitario, descuento, comision_empleado)
            VALUES (v_venta_id, v_medicamento.id, (v_item->>'cantidad')::INTEGER, v_precio, v_descuento, v_comision_item);
            
            -- Actualizar stock
            UPDATE medicamentos
            SET stock_actual = stock_actual - (v_item->>'cantidad')::INTEGER
            WHERE id = v_medicamento.id;
            
            -- Sumar al total
            v_total := v_total + (v_precio * (v_item->>'cantidad')::INTEGER);
        END;
    END LOOP;
    
    -- Actualizar total de venta
    UPDATE ventas SET total = v_total WHERE id = v_venta_id;
    
    -- Registrar comisión si aplica
    IF v_comision > 0 THEN
        -- Aquí podrías insertar en una tabla de comisiones si la tuvieras
        RAISE NOTICE 'Comisión total para el empleado: %', v_comision;
    END IF;
    
    -- Verificar y generar pedidos si el stock está por debajo del mínimo
    PERFORM generar_pedidos_automaticos();
END;
$$;