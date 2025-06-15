CREATE OR REPLACE FUNCTION validar_refrigeracion()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
DECLARE
    v_refrigerado BOOLEAN;
BEGIN
    -- Verificar que medicamentos refrigerados se almacenan correctamente
    SELECT refrigerado INTO v_refrigerado
    FROM medicamentos
    WHERE id = NEW.medicamento_id;
    
    IF v_refrigerado AND NOT (SELECT refrigeracion FROM almacenes WHERE id = NEW.almacen_id) THEN
        RAISE EXCEPTION 'Medicamento refrigerado debe almacenarse en área con refrigeración';
    END IF;
    
    RETURN NEW;
END;
$$;

CREATE TRIGGER tr_validar_refrigeracion
BEFORE INSERT OR UPDATE ON items_inventario
FOR EACH ROW EXECUTE FUNCTION validar_refrigeracion();