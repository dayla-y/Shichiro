CREATE TABLE dialogos (
    id SERIAL PRIMARY KEY,
    npc_id INTEGER REFERENCES npcs(id),
    texto TEXT NOT NULL,
    opciones JSONB, -- {opciones: [{texto: "Opción 1", destino: 2}, ...]}
    siguiente_dialogo INTEGER REFERENCES dialogos(id),
    trigger_evento VARCHAR(50),
    requiere_item INTEGER REFERENCES objetos_nivel(id)
);