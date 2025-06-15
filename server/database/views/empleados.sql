CREATE VIEW vista_ventas_empleados AS
SELECT e.id, e.nombre, e.puesto, 
       COUNT(v.id) as total_ventas,
       SUM(v.total) as monto_total,
       SUM(dv.comision_empleado) as comision_total
FROM empleados e
LEFT JOIN ventas v ON e.id = v.empleado_id
LEFT JOIN detalles_venta dv ON v.id = dv.venta_id
GROUP BY e.id, e.nombre, e.puesto;