CREATE VIEW vista_medicamentos_proximos_vencer AS
SELECT m.id, m.nombre, rc.lote, rc.fecha_vencimiento, rc.cantidad,
       (rc.fecha_vencimiento - CURRENT_DATE) as dias_para_vencer
FROM registro_caducidades rc
JOIN medicamentos m ON rc.medicamento_id = m.id
WHERE rc.estado = 'en_stock'
AND rc.fecha_vencimiento BETWEEN CURRENT_DATE AND (CURRENT_DATE + INTERVAL '6 months');