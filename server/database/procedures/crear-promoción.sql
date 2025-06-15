CREATE OR REPLACE PROCEDURE crear_promocion(
    p_fecha_inicio DATE,
    p_fecha_fin DATE,
    p_porcentaje_descuento NUMERIC(5,2),
    p_descripcion TEXT,
    p_medicamentos JSONB
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_promocion_id INTEGER;
    v_item JSONB;
BEGIN
    -- Validar fechas
    IF p_fecha_inicio > p_fecha_fin THEN
        RAISE EXCEPTION 'La fecha de inicio no puede ser posterior a la fecha de fin';
    END IF;
    
    -- Crear promoción
    INSERT INTO promociones(fecha_inicio, fecha_fin, porcentaje_descuento, descripcion)
    VALUES (p_fecha_inicio, p_fecha_fin, p_porcentaje_descuento, p_descripcion)
    RETURNING id INTO v_promocion_id;
    
    -- Agregar medicamentos a la promoción
    FOR v_item IN SELECT * FROM jsonb_array_elements(p_medicamentos)
    LOOP
        INSERT INTO medicamentos_promocion(
            promocion_id, 
            medicamento_id, 
            stock_inicial_promocion, 
            stock_actual_promocion
        )
        VALUES (
            v_promocion_id,
            (v_item->>'medicamento_id')::INTEGER,
            (v_item->>'cantidad')::INTEGER,
            (v_item->>'cantidad')::INTEGER
        );
    END LOOP;
END;
$$;