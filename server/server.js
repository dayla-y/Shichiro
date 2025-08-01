import cookieParser from 'cookie-parser';
import express from 'express';
import { testConnection } from './configs/db.js';
import medicamentoRoutes from './routes/medicamento-routes.js';
import sellsRoutes from './routes/ventas-router.js';
import empleadoRoutes from './routes/empleados-router.js';
import alertsRoutes from './routes/alertas-router.js';
import warehousesRoutes from './routes/almacenes-router.js';
import clientsRoutes from './routes/clientes-router.js';
import commsRoutes from './routes/comisiones-routes.js';
import devolutionsRoutes from './routes/devolutions-router.js';
import inventarioRoutes from './routes/inventario-router.js';
import itemsInventarioRoutes from './routes/items-inventario-router.js';
import orderClientRoutes from './routes/pedidos-router.js';
import orderRoutes from './routes/pedidos-router.js';
import promotionsRouter from './routes/promociones-router.js';
import receptionsRouter from './routes/recepciones-router.js';
import proveedorRoutes from './routes/proveedor-routes.js';
import registroCaducidadesRoutes from './routes/registro-caducidades-routes.js';
import sucursalRoutes from './routes/sucursal-routes.js';
import promocionRoutes from './routes/promocion-routes.js';
import realizarVentaRoutes from './routes/realizar-venta-router.js';
import recepcionRoutes from './routes/recepcion-routes.js';
import transferenciasRoutes from './routes/transferencias-routes.js';
import comisionRoutes from './routes/comisionRoutes.js';
import reporteCaducidadesRouter from './routes/reporteCaducidadesRoutes.js';
import jugadorRoutes from './routes/jugador-routes.js';
import estadoJugadorRoutes from './routes/estado-jugador-routes.js';
import objetoNivelRoutes from './routes/objeto-nivel-routes.js';
import animacionRoutes from './routes/animacion-routes.js';
import npcRoutes from './routes/npc-routes.js';
import dialogoRoutes from './routes/dialogo-routes.js';
import escenaRoutes from './routes/escena-routes.js';
import partidaGuardadaRoutes from './routes/partidaGuardada-routes.js';
import interaccionRoutes from './routes/interaccion-routes.js';

// import cors from 'cors';

const app = express();
const port = process.env.PORT || 4000;

await testConnection();

// Allow multiple origins
// const allowedOrigins = ['http://localhost:5173'];


// Middleware configutarion
app.use(express.json());
app.use(cookieParser());
// app.use(cors({ origin: allowedOrigins, credentials: true }));


// Routes
app.get('/', (req, res) => res.send("API is working"));
app.use('/api/alertas', alertsRoutes);
app.use('/api/almacenes', warehousesRoutes);
app.use('/api/clientes', clientsRoutes);
app.use('/api/comisiones', commsRoutes);
app.use('/api/devoluciones', devolutionsRoutes);
app.use('/api/items-inventario', itemsInventarioRoutes);
app.use('/api/devoluciones', devolutionsRoutes);
app.use('/api/medicamentos', medicamentoRoutes);
app.use('/api/promociones', promotionsRouter);
app.use('/api/proveedor', proveedorRoutes);
app.use('/api/recepciones', receptionsRouter);
app.use('/api/registro-caducidades', registroCaducidadesRoutes);
app.use('/api/sucursales', sucursalRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/order-client', orderClientRoutes);
app.use('/api/sells', sellsRoutes);
app.use('/api/empleados', empleadoRoutes);

app.use('/api/promocion', promocionRoutes);
app.use('/api/realizar-venta', realizarVentaRoutes);
app.use('/api/realizar-venta', recepcionRoutes);
app.use('/api/transferencias', transferenciasRoutes);


app.use('/api/reporte-caducidades', reporteCaducidadesRouter);

app.use('/api/comisiones', comisionRoutes);


// Jugador
app.use('/api/jugador', jugadorRoutes);
app.use('/api/estado-jugador', estadoJugadorRoutes);
app.use('/api/animaciones', animacionRoutes);
app.use('/api/interacciones', interaccionRoutes);


app.use('/api/npcs', npcRoutes);
app.use('/api/dialogo', dialogoRoutes);


app.use('/api/objeto-niveles', objetoNivelRoutes);
app.use('/api/escena', escenaRoutes);

app.use('/api/partida-guardada', partidaGuardadaRoutes);


app.listen(port, ()=>{
  console.log(`Server is running on http://localhost:${port}`);
})