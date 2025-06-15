CREATE TABLE ventas (
    id SERIAL PRIMARY KEY,
    fecha TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    paciente_nombre VARCHAR(100),
    doctor_nombre VARCHAR(100),
    doctor_telefono VARCHAR(20),
    doctor_licencia VARCHAR(50),
    empleado_id INTEGER REFERENCES empleados(id),
    total NUMERIC(10,2) NOT NULL
);

CREATE TABLE detalles_venta (
    id SERIAL PRIMARY KEY,
    venta_id INTEGER NOT NULL REFERENCES ventas(id),
    medicamento_id INTEGER NOT NULL REFERENCES medicamentos(id),
    cantidad INTEGER NOT NULL,
    precio_unitario NUMERIC(10,2) NOT NULL,
    descuento NUMERIC(5,2) DEFAULT 0,
    comision_empleado NUMERIC(5,2)
);