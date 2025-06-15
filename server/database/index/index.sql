CREATE INDEX idx_medicamentos_clasificacion ON medicamentos(clasificacion);
CREATE INDEX idx_medicamentos_stock ON medicamentos(stock_actual) WHERE stock_actual < stock_minimo;
CREATE INDEX idx_detalles_venta_venta_id ON detalles_venta(venta_id);
CREATE INDEX idx_detalles_recepcion_medicamento ON detalles_recepcion(medicamento_id);
CREATE INDEX idx_registro_caducidades_fecha ON registro_caducidades(fecha_vencimiento) WHERE fecha_vencimiento BETWEEN CURRENT_DATE AND (CURRENT_DATE + INTERVAL '6 months');