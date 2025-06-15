CREATE TABLE comisiones (
    id SERIAL PRIMARY KEY,
    empleado_id INTEGER NOT NULL REFERENCES empleados(id),
    venta_id INTEGER REFERENCES ventas(id),
    monto NUMERIC(10,2) NOT NULL,
    fecha TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    descripcion TEXT
);