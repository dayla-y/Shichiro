CREATE OR REPLACE FUNCTION calcular_comision(p_empleado_id INTEGER, p_fecha_inicio DATE, p_fecha_fin DATE)
RETURNS NUMERIC(10,2)
LANGUAGE plpgsql
AS $$
DECLARE
    v_comision_total NUMERIC(10,2) := 0;
BEGIN
    SELECT COALESCE(SUM(dv.comision_empleado), 0) INTO v_comision_total
    FROM ventas v
    JOIN detalles_venta dv ON v.id = dv.venta_id
    JOIN medicamentos m ON dv.medicamento_id = m.id
    WHERE v.empleado_id = p_empleado_id
    AND v.fecha BETWEEN p_fecha_inicio AND p_fecha_fin
    AND m.clasificacion = 'vitamina_suplemento';
    
    RETURN v_comision_total;
END;
$$;