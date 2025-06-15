CREATE OR REPLACE FUNCTION control_stock()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    -- Verificar que el stock no sea negativo
    IF NEW.stock_actual < 0 THEN
        RAISE EXCEPTION 'El stock no puede ser negativo';
    END IF;
    
    -- Si el stock está por debajo del mínimo, registrar una alerta
    IF NEW.stock_actual < NEW.stock_minimo THEN
        INSERT INTO alertas_stock(medicamento_id, stock_actual, stock_minimo, fecha)
        VALUES (NEW.id, NEW.stock_actual, NEW.stock_minimo, CURRENT_TIMESTAMP);
    END IF;
    
    RETURN NEW;
END;
$$;

CREATE TRIGGER tr_control_stock
AFTER INSERT OR UPDATE ON medicamentos
FOR EACH ROW EXECUTE FUNCTION control_stock();