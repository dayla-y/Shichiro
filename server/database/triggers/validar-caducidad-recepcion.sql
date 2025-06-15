CREATE OR REPLACE FUNCTION validar_caducidad_recepcion()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    -- Verificar que la fecha de vencimiento no es pasada
    IF NEW.fecha_vencimiento < CURRENT_DATE THEN
        RAISE EXCEPTION 'No se puede recibir medicamento con fecha de vencimiento pasada';
    END IF;
    
    -- Si el medicamento caduca en menos de 3 meses, registrar alerta
    IF NEW.fecha_vencimiento < (CURRENT_DATE + INTERVAL '3 months') THEN
        INSERT INTO alertas_caducidad(medicamento_id, lote, fecha_vencimiento, cantidad, fecha_alerta)
        VALUES (NEW.medicamento_id, NEW.lote, NEW.fecha_vencimiento, NEW.cantidad, CURRENT_TIMESTAMP);
    END IF;
    
    RETURN NEW;
END;
$$;

CREATE TRIGGER tr_validar_caducidad_recepcion
BEFORE INSERT ON detalles_recepcion
FOR EACH ROW EXECUTE FUNCTION validar_caducidad_recepcion();