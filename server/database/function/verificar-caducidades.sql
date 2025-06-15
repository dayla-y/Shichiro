CREATE OR REPLACE FUNCTION verificar_caducidades_proximas()
RETURNS VOID
LANGUAGE plpgsql
AS $$
BEGIN
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
    
    -- Notificar al administrador (esto podría ser un email o registro en una tabla de notificaciones)
    RAISE LOG 'Verificación de caducidades completada. Medicamentos próximos a vencer identificados.';
END;
$$;