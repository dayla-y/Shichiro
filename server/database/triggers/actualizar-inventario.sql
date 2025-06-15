CREATE OR REPLACE FUNCTION actualizar_inventario_venta()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    -- Actualizar stock cuando se inserta un detalle de venta
    UPDATE medicamentos
    SET stock_actual = stock_actual - NEW.cantidad
    WHERE id = NEW.medicamento_id;
    
    RETURN NEW;
END;
$$;

CREATE TRIGGER tr_actualizar_inventario_venta
AFTER INSERT ON detalles_venta
FOR EACH ROW EXECUTE FUNCTION actualizar_inventario_venta();