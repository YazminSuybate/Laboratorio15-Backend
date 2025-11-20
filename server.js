const express = require('express');
const cors = require('cors');
const pool = require('./db');
const productosRoutes = require('./routes/product.routes');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3888;

app.use(cors());
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