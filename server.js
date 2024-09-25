const express = require('express');
const app = express();

// Reemplazar body-parser con express.json() porque body-parser ya está incorporado en Express
app.use(express.json());

const db = require('./app/config/db.config.js');

// Sincronización de la base de datos sin el "force: true" para evitar eliminar las tablas cada vez que inicies el servidor
db.sequelize.sync().then(() => {
  console.log('Resync sin forzar eliminación de tablas');
}).catch(err => {
  console.error('Error al sincronizar la base de datos:', err);
});

let router = require('./app/routers/router.js');

const cors = require('cors');

// Habilitar CORS para todos los orígenes, o especifica el origen que prefieras
const corsOptions = {
  origin: '*', // Cambia a un origen específico si lo necesitas, como 'http://localhost:4200'
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Ruta para la API
app.use('/', router);

// Ruta principal
app.get("/", (req, res) => {
  res.json({ message: "Bienvenido Estudiantes de UMG" });
});

// Middleware para manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack); // Imprime el error en la consola para debug
  res.status(500).send('Internal Server Error'); // Envía una respuesta de error al cliente
});

// Crear un servidor en el puerto 8080 o el puerto definido por el entorno
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, function () {
  console.log(`App listening at http://localhost:${PORT}`);
});
