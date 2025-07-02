CREATE OR REPLACE FUNCTION verificar_caducidades_proximas()
RETURNS VOID
LANGUAGE plpgsql
AS $$
BEGIN
    -- Eliminar registros antiguos de medicamentos que ya no cumplen los criterios
    DELETE FROM reporte_caducidades rc
    WHERE NOT EXISTS (
        SELECT 1 FROM detalles_recepcion dr
        WHERE dr.medicamento_id = rc.medicamento_id
        AND dr.lote = rc.lote
        AND dr.fecha_vencimiento BETWEEN CURRENT_DATE AND (CURRENT_DATE + INTERVAL '6 months')
    );
    
    -- Insertar registros de medicamentos que caducan en menos de 6 meses
    INSERT INTO reporte_caducidades (medicamento_id, lote, fecha_vencimiento, cantidad)
    SELECT dr.medicamento_id, dr.lote, dr.fecha_vencimiento, dr.cantidad
    FROM detalles_recepcion dr
    WHERE dr.fecha_vencimiento BETWEEN CURRENT_DATE AND (CURRENT_DATE + INTERVAL '6 months')
    AND NOT EXISTS (
        SELECT 1 FROM reporte_caducidades rc
        WHERE rc.medicamento_id = dr.medicamento_id
        AND rc.lote = dr.lote
    );
    
    -- Notificar al administrador
    RAISE LOG 'Verificación de caducidades completada. Medicamentos próximos a vencer identificados.';
END;
$$;