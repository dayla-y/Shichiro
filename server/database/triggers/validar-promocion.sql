CREATE OR REPLACE FUNCTION validar_promocion()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    -- Verificar que las fechas son válidas
    IF NEW.fecha_inicio > NEW.fecha_fin THEN
        RAISE EXCEPTION 'La fecha de inicio no puede ser posterior a la fecha de fin';
    END IF;
    
    -- Verificar que no hay superposición con otras promociones para los mismos medicamentos
    IF EXISTS (
        SELECT 1 FROM medicamentos_promocion mp
        JOIN promociones p ON mp.promocion_id = p.id
        WHERE mp.medicamento_id IN (
            SELECT medicamento_id FROM medicamentos_promocion WHERE promocion_id = NEW.id
        )
        AND p.id != NEW.id
        AND (NEW.fecha_inicio, NEW.fecha_fin) OVERLAPS (p.fecha_inicio, p.fecha_fin)
    ) THEN
        RAISE EXCEPTION 'Existe una promoción superpuesta para uno o más medicamentos';
    END IF;
    
    RETURN NEW;
END;
$$;

CREATE TRIGGER tr_validar_promocion
BEFORE INSERT OR UPDATE ON promociones
FOR EACH ROW EXECUTE FUNCTION validar_promocion();