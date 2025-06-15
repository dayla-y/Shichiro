CREATE VIEW vista_inventario_bajo AS
SELECT m.id, m.nombre, m.stock_actual, m.stock_minimo, p.nombre as proveedor
FROM medicamentos m
JOIN proveedores p ON m.proveedor_id = p.id
WHERE m.stock_actual < m.stock_minimo;