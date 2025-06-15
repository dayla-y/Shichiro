CREATE OR REPLACE FUNCTION verificar_requiere_receta(p_venta_id INTEGER)
RETURNS BOOLEAN
LANGUAGE plpgsql
AS $$
DECLARE
    v_requiere_receta BOOLEAN := FALSE;
    v_venta RECORD;
BEGIN
    -- Obtener datos de la venta
    SELECT * INTO v_venta FROM ventas WHERE id = p_venta_id;
    
    -- Verificar si hay medicamentos que requieren receta
    SELECT TRUE INTO v_requiere_receta
    FROM detalles_venta dv
    JOIN medicamentos m ON dv.medicamento_id = m.id
    WHERE dv.venta_id = p_venta_id AND m.requiere_receta
    LIMIT 1;
    
    -- Si requiere receta, verificar datos del doctor
    IF v_requiere_receta AND (v_venta.doctor_nombre IS NULL OR v_venta.doctor_licencia IS NULL) THEN
        RETURN FALSE;
    END IF;
    
    RETURN TRUE;
END;
$$;