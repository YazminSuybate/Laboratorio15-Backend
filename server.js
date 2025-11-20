const express = require('express');
const cors = require('cors');
const pool = require('./db');
const productosRoutes = require('./routes/product.routes');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3888;

const allowedOrigins = [
    'https://laboratorio15-frontend.vercel.app/',
    'http://localhost:5173'
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('No permitido por CORS'));
        }
    }
}));

app.use(express.json());

// --- Rutas ---
app.use('/api/productos', productosRoutes);

const initDB = async () => {
    try {
        await pool.query(`
      CREATE TABLE IF NOT EXISTS productos (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(100),
        precio DECIMAL(10,2),
        stock INT
      );
    `);
        console.log("Tabla 'productos' lista");
    } catch (err) {
        console.error("Error DB:", err);
    }
};
initDB();

app.listen(port, () => {
    console.log(`Servidor corriendo en puerto ${port}`);
});